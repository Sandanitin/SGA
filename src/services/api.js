import axios from 'axios';

// Initial Seed Data for immediate preview fallback
const INITIAL_COMPANIES = [
  {
    id: 1,
    company_name: "Lucid Trading",
    slug: "lucid-trading",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&auto=format&fit=crop&q=80",
    short_description: "DGT Trusted - Most Popular. 15-minute payouts, 90% profit split, instant funding, no consistency rule.",
    full_description: "Lucid Trading is a premier futures prop trading firm providing instant funding, zero consistency rules, 90% profit splits, and ultra-fast 15-minute daily payouts.",
    website_url: "https://lucidtrading.com",
    discount: "40% OFF",
    promo_code: "DGT",
    deal_url: "https://lucidtrading.com",
    featured: 1,
    status: "active",
    max_funding: "$750,000",
    max_accounts: "5 ACCTS X $150K",
    profit_split: "90/10",
    start_price: "$193",
    rating: 4.8,
    platform: "Tradovate, NinjaTrader"
  },
  {
    id: 2,
    company_name: "Take Profit Trader",
    slug: "take-profit-trader",
    logo: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=200&auto=format&fit=crop&q=80",
    short_description: "DGT Trusted - Best Daily Payouts. 1-hour payouts, 80% profit split, and trader-friendly evaluation rules.",
    full_description: "Take Profit Trader gives futures traders direct access to funded accounts with daily payouts, 1-hour withdrawal speeds, and high profit share options.",
    website_url: "https://takeprofittrader.com",
    discount: "50% OFF",
    promo_code: "DGT",
    deal_url: "https://takeprofittrader.com",
    featured: 1,
    status: "active",
    max_funding: "$750,000",
    max_accounts: "5 ACCTS X $150K",
    profit_split: "80/20",
    start_price: "$180",
    rating: 4.7,
    platform: "Tradovate, NinjaTrader, Rithmic"
  },
  {
    id: 3,
    company_name: "Tradeify",
    slug: "tradeify",
    logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format&fit=crop&q=80",
    short_description: "DGT Trusted - Best Instant Funding. 1-hour payouts, 90% profit split, instant funding, no consistency rule.",
    full_description: "Tradeify specializes in instant funding evaluation models for futures traders, featuring 90% profit split, fast 1-hour payouts, and raw execution.",
    website_url: "https://tradeify.co",
    discount: "40% OFF",
    promo_code: "DGT",
    deal_url: "https://tradeify.co",
    featured: 1,
    status: "active",
    max_funding: "$750,000",
    max_accounts: "5 ACCTS X $150K",
    profit_split: "90/10",
    start_price: "$99",
    rating: 4.7,
    platform: "Tradovate, NinjaTrader"
  },
  {
    id: 4,
    company_name: "Apex Trader Funding",
    slug: "apex-trader-funding",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&auto=format&fit=crop&q=80",
    short_description: "The #1 Futures prop firm offering massive evaluation sales, 100% of first $25k profits, and daily payouts.",
    full_description: "Apex Trader Funding leads the futures trading industry with generous evaluation discounts, rapid evaluation pass rates, and smooth payout distributions through Tradovate and NinjaTrader.",
    website_url: "https://apextraderfunding.com",
    discount: "80% OFF",
    promo_code: "APEX80",
    deal_url: "https://apextraderfunding.com",
    featured: 1,
    status: "active",
    max_funding: "$300,000",
    profit_split: "90/10",
    start_price: "$147",
    rating: 4.7,
    platform: "Rithmic, Tradovate, NinjaTrader"
  }
];

const INITIAL_GIVEAWAYS = [
  {
    id: 1,
    first_name: "Alex",
    last_name: "Rivers",
    youtube_username: "@AlexTraderFX",
    email: "alex.rivers@example.com",
    consent: 1,
    created_at: "2026-08-05 14:22:10"
  },
  {
    id: 2,
    first_name: "David",
    last_name: "Kovac",
    youtube_username: "@D_Kovac_Trades",
    email: "david.k@example.com",
    consent: 1,
    created_at: "2026-08-06 09:15:43"
  },
  {
    id: 3,
    first_name: "Sophia",
    last_name: "Chen",
    youtube_username: "@SophiaPips",
    email: "sophia.c@example.com",
    consent: 1,
    created_at: "2026-08-07 18:04:12"
  }
];

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const CURRENT_COMPANIES_KEY = 'opf_companies_v5';

const getLocal = (key, fallback) => {
  // Purge old company keys to ensure updated firms load
  ['opf_companies_v1', 'opf_companies_v2', 'opf_companies_v3', 'opf_companies_v4'].forEach(k => localStorage.removeItem(k));

  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try { 
    const parsed = JSON.parse(data);
    // If cache has old companies like FTMO or FundedNext, replace with fallback
    if (Array.isArray(parsed) && parsed.some(c => c.company_name === 'FTMO' || c.company_name === 'FundedNext' || c.company_name === 'Funding Pips')) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return parsed;
  } catch (e) { 
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback; 
  }
};

const setLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Company Service
export const companyService = {
  async getCompanies(params = {}) {
    try {
      const res = await apiClient.get('/companies/list.php', { params });
      if (res.data && res.data.success) return res.data.data;
    } catch (e) {
      console.log('API offline, using local client DB for companies');
    }

    let list = getLocal(CURRENT_COMPANIES_KEY, INITIAL_COMPANIES);
    if (!params.admin) {
      list = list.filter(c => c.status === 'active');
    }
    if (params.featured) {
      list = list.filter(c => c.featured === 1);
    }
    if (params.search) {
      const term = params.search.toLowerCase();
      list = list.filter(c => 
        c.company_name.toLowerCase().includes(term) ||
        c.short_description.toLowerCase().includes(term) ||
        (c.platform && c.platform.toLowerCase().includes(term))
      );
    }
    return list;
  },

  async getCompanyBySlug(slug) {
    try {
      const res = await apiClient.get(`/companies/get.php?slug=${slug}`);
      if (res.data && res.data.success) return res.data.data;
    } catch (e) {
      console.log('API offline, resolving slug locally');
    }

    const list = getLocal(CURRENT_COMPANIES_KEY, INITIAL_COMPANIES);
    return list.find(c => c.slug === slug || String(c.id) === String(slug)) || null;
  },

  async createCompany(companyData) {
    try {
      const res = await apiClient.post('/companies/create.php', companyData);
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      console.log('API offline, creating company locally');
    }

    const list = getLocal(CURRENT_COMPANIES_KEY, INITIAL_COMPANIES);
    const slug = companyData.slug || companyData.company_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newComp = {
      ...companyData,
      id: Date.now(),
      slug,
      rating: parseFloat(companyData.rating || 4.8),
      featured: companyData.featured ? 1 : 0,
      status: companyData.status || 'active'
    };
    list.unshift(newComp);
    setLocal(CURRENT_COMPANIES_KEY, list);
    return { success: true, message: 'Company created successfully', slug };
  },

  async updateCompany(companyData) {
    try {
      const res = await apiClient.post('/companies/update.php', companyData);
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      console.log('API offline, updating company locally');
    }

    const list = getLocal(CURRENT_COMPANIES_KEY, INITIAL_COMPANIES);
    const idx = list.findIndex(c => c.id === companyData.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...companyData };
      setLocal(CURRENT_COMPANIES_KEY, list);
    }
    return { success: true, message: 'Company updated successfully' };
  },

  async deleteCompany(id) {
    try {
      const res = await apiClient.post('/companies/delete.php', { id });
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      console.log('API offline, deleting company locally');
    }

    let list = getLocal(CURRENT_COMPANIES_KEY, INITIAL_COMPANIES);
    list = list.filter(c => c.id !== id);
    setLocal(CURRENT_COMPANIES_KEY, list);
    return { success: true, message: 'Company deleted' };
  },

  async uploadLogo(file) {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      const res = await axios.post('/api/companies/upload.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      console.log('Logo upload offline, returning object URL preview');
    }
    return {
      success: true,
      file_url: URL.createObjectURL(file)
    };
  }
};

// Giveaway Service
export const giveawayService = {
  async submitGiveaway(entryData) {
    try {
      const res = await apiClient.post('/giveaways/submit.php', entryData);
      if (res.data && res.data.success) return res.data;
      if (res.data && res.data.message) throw new Error(res.data.message);
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        throw new Error(e.response.data.message);
      }
      if (e.message && !e.message.includes('Network Error')) throw e;
    }

    const list = getLocal('opf_giveaways_v2', INITIAL_GIVEAWAYS);
    const newEntry = {
      id: Date.now(),
      ...entryData,
      consent: entryData.consent ? 1 : 0,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    list.unshift(newEntry);
    setLocal('opf_giveaways_v2', list);
    return { success: true, message: 'Your entry has been submitted successfully.' };
  },

  async getGiveaways(search = '') {
    try {
      const res = await apiClient.get('/giveaways/list.php', { params: { search } });
      if (res.data && res.data.success) return res.data.data;
    } catch (e) {
      console.log('Fetching giveaways locally');
    }

    let list = getLocal('opf_giveaways_v2', INITIAL_GIVEAWAYS);
    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(g =>
        g.first_name.toLowerCase().includes(term) ||
        g.last_name.toLowerCase().includes(term) ||
        g.email.toLowerCase().includes(term) ||
        g.youtube_username.toLowerCase().includes(term)
      );
    }
    return list;
  },

  async deleteGiveaway(id) {
    try {
      const res = await apiClient.post('/giveaways/delete.php', { id });
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      console.log('Deleting giveaway entry locally');
    }

    let list = getLocal('opf_giveaways_v2', INITIAL_GIVEAWAYS);
    list = list.filter(g => g.id !== id);
    setLocal('opf_giveaways_v2', list);
    return { success: true, message: 'Entry deleted' };
  }
};

// Auth Service
export const authService = {
  async login(username, password) {
    try {
      const res = await apiClient.post('/auth/login.php', { username, password });
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        throw new Error(e.response.data.message);
      }
    }

    if ((username === 'admin' || username === 'admin@sga.com') && password === 'admin123') {
      return {
        success: true,
        token: 'demo_jwt_token_' + Date.now(),
        user: { username: 'admin', email: 'admin@sga.com' }
      };
    }
    throw new Error('Invalid username or password');
  },

  async logout() {
    try {
      await apiClient.get('/auth/logout.php');
    } catch (e) {}
    sessionStorage.removeItem('opf_admin_token');
  }
};

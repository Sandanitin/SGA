import axios from 'axios';

// Initial Seed Data for immediate preview fallback
const INITIAL_COMPANIES = [
  {
    id: 1,
    company_name: "FTMO",
    slug: "ftmo",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&auto=format&fit=crop&q=80",
    short_description: "Industry leading prop firm with up to 90% profit split, instant scaling up to $2,000,000, and fast bi-weekly payouts.",
    full_description: "FTMO is a widely acclaimed proprietary trading platform operating globally. Traders receive evaluation accounts up to $200,000 with comprehensive educational resources, performance coaching, and top-tier liquidity execution.",
    website_url: "https://ftmo.com",
    discount: "10% OFF",
    promo_code: "SGA",
    deal_url: "https://ftmo.com",
    featured: 1,
    status: "active",
    max_funding: "$200,000",
    profit_split: "90/10",
    start_price: "$170",
    rating: 4.9,
    platform: "MT4, MT5, cTrader, DXtrade"
  },
  {
    id: 2,
    company_name: "Funding Pips",
    slug: "funding-pips",
    logo: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=200&auto=format&fit=crop&q=80",
    short_description: "Built by traders for traders. Lowest evaluation fees, zero minimum trading days, and 5-day payout cycles.",
    full_description: "Funding Pips provides an accessible, trader-centric environment designed to maximize funded capital growth. Enjoy 5-day payout intervals, raw spreads, and flexible risk parameters.",
    website_url: "https://fundingpips.com",
    discount: "20% OFF",
    promo_code: "PIPS20",
    deal_url: "https://fundingpips.com",
    featured: 1,
    status: "active",
    max_funding: "$300,000",
    profit_split: "85/15 - 90%",
    start_price: "$32",
    rating: 4.8,
    platform: "cTrader, Match-Trader"
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    company_name: "The 5%ers",
    slug: "the-5ers",
    logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format&fit=crop&q=80",
    short_description: "Hyper-growth account scaling, instant real capital funding, and risk-free scaling program for forex traders.",
    full_description: "The 5%ers offers immediate funding models and traditional evaluation pathways designed for long-term career traders.",
    website_url: "https://the5ers.com",
    discount: "10% OFF",
    promo_code: "FIVESGA",
    deal_url: "https://the5ers.com",
    featured: 0,
    status: "active",
    max_funding: "$4,000,000",
    profit_split: "100%",
    start_price: "$95",
    rating: 4.8,
    platform: "MT5"
  },
  {
    id: 5,
    company_name: "FundedNext",
    slug: "fundednext",
    logo: "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=200&auto=format&fit=crop&q=80",
    short_description: "Get paid 15% profit split even during the evaluation phase! No time limits and raw spread execution.",
    full_description: "FundedNext rewards consistent traders from day one with a unique 15% profit share during challenge phases, robust trading dashboards, and dedicated account manager support.",
    website_url: "https://fundednext.com",
    discount: "15% OFF",
    promo_code: "NEXT15",
    deal_url: "https://fundednext.com",
    featured: 1,
    status: "active",
    max_funding: "$200,000",
    profit_split: "90/10",
    start_price: "$49",
    rating: 4.9,
    platform: "MT4, MT5, cTrader"
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

const getLocal = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try { return JSON.parse(data); } catch (e) { return fallback; }
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

    let list = getLocal('opf_companies_v2', INITIAL_COMPANIES);
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

    const list = getLocal('opf_companies_v2', INITIAL_COMPANIES);
    return list.find(c => c.slug === slug || String(c.id) === String(slug)) || null;
  },

  async createCompany(companyData) {
    try {
      const res = await apiClient.post('/companies/create.php', companyData);
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      console.log('API offline, creating company locally');
    }

    const list = getLocal('opf_companies_v2', INITIAL_COMPANIES);
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
    setLocal('opf_companies_v2', list);
    return { success: true, message: 'Company created successfully', slug };
  },

  async updateCompany(companyData) {
    try {
      const res = await apiClient.post('/companies/update.php', companyData);
      if (res.data && res.data.success) return res.data;
    } catch (e) {
      console.log('API offline, updating company locally');
    }

    const list = getLocal('opf_companies_v2', INITIAL_COMPANIES);
    const idx = list.findIndex(c => c.id === companyData.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...companyData };
      setLocal('opf_companies_v2', list);
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

    let list = getLocal('opf_companies_v2', INITIAL_COMPANIES);
    list = list.filter(c => c.id !== id);
    setLocal('opf_companies_v2', list);
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

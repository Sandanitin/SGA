import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, BarChart2, ShieldCheck, Check } from 'lucide-react';
import { CompanyCard } from '../components/CompanyCard';
import { apiService } from '../services/api';

export function ComparePage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [fundingFilter, setFundingFilter] = useState('ALL');
  const [profitSplitFilter, setProfitSplitFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('RATING');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setLoading(true);
    const data = await apiService.getCompanies();
    setCompanies(data);
    setLoading(false);
  };

  // Dynamic Search & Filtering
  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.platform && c.platform.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesFunding = true;
    if (fundingFilter === '100K') {
      matchesFunding = c.max_funding.includes('100') || c.max_funding.includes('200') || c.max_funding.includes('300');
    } else if (fundingFilter === '300K+') {
      matchesFunding = c.max_funding.includes('300') || c.max_funding.includes('4,000') || c.max_funding.includes('500');
    }

    let matchesProfit = true;
    if (profitSplitFilter === '90%') {
      matchesProfit = c.profit_split.includes('90') || c.profit_split.includes('100');
    }

    return matchesSearch && matchesFunding && matchesProfit;
  }).sort((a, b) => {
    if (sortBy === 'RATING') return b.rating - a.rating;
    if (sortBy === 'NAME') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div style={{ background: '#ffffff', color: 'var(--text-main)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '24px 0 12px', textAlign: 'center', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: '8px', display: 'inline-flex' }}>
            <BarChart2 size={13} /> LIVE MATRIX
          </span>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '4px auto 6px', textAlign: 'center', fontWeight: '800' }}>
            Prop Firm <span className="text-gold">Comparison Engine</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>
            Compare evaluation fees, maximum funding limits, payout splits, and verified trader reviews across top proprietary trading firms.
          </p>
        </div>
      </section>



      {/* Search & Filter Control Bar */}
      <section style={{ padding: '20px 0 40px' }}>
        <div className="container">
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
              
              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Search prop firm name or platform..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '42px' }}
                />
              </div>

              {/* Funding Filter */}
              <div>
                <select 
                  className="form-select" 
                  value={fundingFilter}
                  onChange={(e) => setFundingFilter(e.target.value)}
                >
                  <option value="ALL">All Funding Limits</option>
                  <option value="100K">Up to $200,000</option>
                  <option value="300K+">$300,000 to $4,000,000</option>
                </select>
              </div>

              {/* Profit Split Filter */}
              <div>
                <select 
                  className="form-select" 
                  value={profitSplitFilter}
                  onChange={(e) => setProfitSplitFilter(e.target.value)}
                >
                  <option value="ALL">All Profit Splits</option>
                  <option value="90%">90% to 100% Payout</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <select 
                  className="form-select" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="RATING">Sort by Highest Rating</option>
                  <option value="NAME">Sort Alphabetically</option>
                </select>
              </div>

            </div>
          </div>

          {/* Dynamic Table Layout */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              <RefreshCw size={32} className="spin" style={{ marginBottom: '12px' }} />
              <p>Loading Prop Firm Catalog...</p>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div style={{ background: '#ffffff', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
              <h3 style={{ marginBottom: '8px' }}>No Prop Firms Found</h3>
              <p className="text-muted">Try clearing search keywords or filters.</p>
            </div>
          ) : (
            <div className="dark-table-container">
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>Firm Name</th>
                    <th>Rating</th>
                    <th>Max Accounts</th>
                    <th>Trading Platforms</th>
                    <th>Discount</th>
                    <th>Discount Code</th>
                    <th style={{ textAlign: 'center' }}>Website</th>

                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <CompanyCard key={company.id} company={company} layout="dark-row" />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



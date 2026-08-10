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
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            <BarChart2 size={14} /> LIVE MATRIX
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.8rem' }}>
            Prop Firm <span className="text-gold">Comparison Engine</span>
          </h1>
          <p className="hero-subtitle">
            Compare evaluation fees, maximum funding limits, payout splits, and verified trader reviews across top proprietary trading firms.
          </p>
        </div>
      </section>

      {/* Search & Filter Control Bar */}
      <section className="section-padding" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'center' }}>
              
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

          {/* Dynamic Company Listings */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Showing <strong style={{ color: '#fff' }}>{filteredCompanies.length}</strong> verified firms
            </div>
            {(searchTerm || fundingFilter !== 'ALL' || profitSplitFilter !== 'ALL') && (
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setFundingFilter('ALL');
                  setProfitSplitFilter('ALL');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              <RefreshCw size={32} className="spin" style={{ marginBottom: '12px' }} />
              <p>Loading Prop Firm Catalog...</p>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '1px dashed var(--glass-border)' }}>
              <h3 style={{ marginBottom: '8px' }}>No Prop Firms Found</h3>
              <p className="text-muted">Try clearing search keywords or filters.</p>
            </div>
          ) : (
            <div className="card-grid">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

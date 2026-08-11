import React, { useState, useEffect } from 'react';
import { Search, Filter, BarChart2 } from 'lucide-react';
import { companyService } from '../services/api';
import { CompanyCard } from '../components/CompanyCard';
import { Loading } from '../components/Loading';

export function PropFirms() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('RATING');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setLoading(true);
    const data = await companyService.getCompanies();
    setCompanies(data);
    setLoading(false);
  };

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.platform && c.platform.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesFeatured = true;
    if (featuredFilter === 'FEATURED') {
      matchesFeatured = c.featured === 1;
    }

    return matchesSearch && matchesFeatured;
  }).sort((a, b) => {
    if (sortBy === 'RATING') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'NAME') return a.company_name.localeCompare(b.company_name);
    return 0;
  });

  return (
    <div style={{ background: '#ffffff', minHeight: '80vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '24px 0 12px', textAlign: 'center', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="badge badge-navy" style={{ marginBottom: '8px', display: 'inline-flex' }}>
            <BarChart2 size={13} /> LIVE MATRIX
          </span>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '4px auto 6px', textAlign: 'center', fontWeight: '800' }}>
            Compare The Best Prop Firms
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>
            Discover and compare leading proprietary trading firms, evaluation specs, profit splits, and verified trader discounts.
          </p>
        </div>
      </section>



      {/* Search & Filters */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'center' }}>
              
              {/* Real-time Search Input */}
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Search by company name, platform..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '42px' }}
                />
              </div>

              {/* Featured Filter */}
              <div>
                <select 
                  className="form-select" 
                  value={featuredFilter}
                  onChange={(e) => setFeaturedFilter(e.target.value)}
                >
                  <option value="ALL">All Prop Firms</option>
                  <option value="FEATURED">Featured Firms Only</option>
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

          {/* Listing Count & Reset */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Showing <strong>{filteredCompanies.length}</strong> available prop firms
            </div>
            {(searchTerm || featuredFilter !== 'ALL') && (
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setFeaturedFilter('ALL');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Company Listing Table */}
          {loading ? (
            <Loading message="Loading prop firm directory..." />
          ) : filteredCompanies.length === 0 ? (
            <div style={{ background: 'var(--bg-secondary)', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
              <h3 style={{ marginBottom: '8px' }}>No Prop Firms Found</h3>
              <p className="text-muted">Try broadening your search keywords or resetting filters.</p>
            </div>
          ) : (
            <div className="dark-table-container">
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>FIRM NAME</th>
                    <th>RATING</th>
                    <th>MAX ACCOUNTS</th>
                    <th>TRADING PLATFORMS</th>
                    <th>DISCOUNT</th>
                    <th>DISCOUNT CODE</th>
                    <th style={{ textAlign: 'center' }}>WEBSITE</th>
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


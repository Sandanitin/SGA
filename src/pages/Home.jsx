import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Flame, ShieldCheck, Percent, Award, Sparkles } from 'lucide-react';
import { companyService } from '../services/api';
import { CompanyCard } from '../components/CompanyCard';
import { DealCard } from '../components/DealCard';
import { Loading } from '../components/Loading';

export function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await companyService.getCompanies();
    setCompanies(data);
    setLoading(false);
  };

  const featuredFirms = companies.filter(c => c.featured === 1);
  const topDeals = companies.slice(0, 3);

  return (
    <div style={{ background: '#ffffff' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div style={{ marginBottom: '16px' }}>
            <span className="badge badge-gold">
              <Sparkles size={14} /> Official Sheshu Gundla Academy (SGA) Portal
            </span>
          </div>

          <h1 className="hero-title">
            Find the Best Prop Firms & <span className="text-gold">Trading Deals</span>
          </h1>

          <p className="hero-subtitle">
            Compare leading prop firms, discover exclusive deals, and find the right trading opportunity for your strategy.
          </p>

          <div className="hero-actions">
            <Link to="/prop-firms" className="btn btn-navy btn-lg">
              Explore Prop Firms <ArrowRight size={18} />
            </Link>
            <a href="#todays-deals" className="btn btn-gold btn-lg">
              View Today's Deals <Flame size={18} />
            </a>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '960px', margin: '40px auto 0' }}>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--navy-accent)' }}>50+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Verified Prop Firms</div>
            </div>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--gold-primary)' }}>$15M+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Funded Accounts Claimed</div>
            </div>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--green-accent)' }}>80% OFF</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Max Flash Discounts</div>
            </div>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--navy-dark)' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Verified Payout Record</div>
            </div>
          </div>

        </div>
      </section>

      {/* Today's Biggest & Largest Deals */}
      <section id="todays-deals" className="section-padding bg-light">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                <Flame size={12} /> HOT DISCOUNTS
              </span>
              <h2 className="section-title">Today's Biggest & Largest Deals</h2>
              <p className="section-subtitle">Hand-picked evaluation deals with maximum promo coupon savings.</p>
            </div>
            <Link to="/prop-firms" className="btn btn-outline btn-sm">
              View All Deals <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <Loading message="Loading today's deals..." />
          ) : (
            <div className="card-grid">
              {topDeals.map((company) => (
                <DealCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Best Firms In The Industry */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="badge badge-navy" style={{ marginBottom: '8px' }}>TOP RATED PROPS</span>
            <h2 className="section-title">Best Firms In The Industry</h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '6px auto 0' }}>
              Evaluated based on payout frequency, scaling rules, customer support, and broker execution.
            </p>
          </div>

          {loading ? (
            <Loading message="Loading prop firms..." />
          ) : (
            <div className="card-grid" style={{ marginTop: '36px' }}>
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Trading Firms */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>FEATURED LIST</span>
            <h2 className="section-title">Featured Trading Firms</h2>
            <p className="section-subtitle">Firms marked as verified partners by SGA Academy.</p>
          </div>

          {loading ? (
            <Loading message="Loading featured firms..." />
          ) : (
            <div className="card-grid">
              {featuredFirms.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ background: 'var(--navy-dark)', color: '#ffffff', padding: '50px 30px', borderRadius: '20px', textAlign: 'center', boxShadow: 'var(--shadow-hover)' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '16px' }}>
              Find Your Next Trading Opportunity
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 30px', fontSize: '1.1rem' }}>
              Compare funding options, choose your challenge, apply SGA promo codes, and win free evaluation accounts today.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/prop-firms" className="btn btn-gold btn-lg">
                Compare Prop Firms
              </Link>
              <Link to="/giveaways" className="btn btn-outline btn-lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
                <Gift size={20} /> Explore Giveaways
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

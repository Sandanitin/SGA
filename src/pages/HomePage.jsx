import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Award, ShieldCheck, ArrowRight, TrendingUp, CheckCircle, Gift, Percent } from 'lucide-react';
import { CompanyCard } from '../components/CompanyCard';
import { apiService } from '../services/api';

export function HomePage({ setActiveTab }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await apiService.getCompanies();
    setCompanies(data);
    setLoading(false);
  };

  const topDeals = companies.filter(c => c.top_deal === 1);
  const featuredFirms = companies.filter(c => c.featured === 1);

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-section">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
        >
          <source src="/307615_medium.mp4" type="video/mp4" />
        </video>

        <div className="hero-video-overlay" />

        <div className="container hero-content">
          <h1 className="hero-title">
            Find Top Prop Firms & <span className="text-gold">Best Trading Deals</span> - 50+ Firms, Up to 80% OFF.
          </h1>
        </div>


      </section>


      {/* The Best Firms In The Industry */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', display: 'block' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>INDUSTRY LEADING PROPS</span>
            <h2 className="section-title">The Best Firms In The Industry</h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '8px auto 0' }}>
              Selected based on payout speed, reputation, scaling plans, and trader satisfaction ratings.
            </p>
          </div>

          <div className="dark-table-container" style={{ marginTop: '36px' }}>
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
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} layout="dark-row" />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* Featured Trading Firms Showcase */}
      <section className="section-padding" style={{ background: 'rgba(6, 13, 25, 0.8)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Why Trust OnlyPropFirms & SGA?</h2>
              <p className="section-subtitle">Empowering traders with transparent specs and real community value.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <ShieldCheck size={36} color="var(--gold-primary)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>100% Verified Partners</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Every proprietary firm on our comparison engine undergoes strict background checks, payout auditing, and community feedback verification.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <Percent size={36} color="#38bdf8" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Guaranteed Best Coupons</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                We negotiate directly with prop firm CEOs to provide the lowest evaluation prices and highest profit split upgrades available anywhere.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <Gift size={36} color="#4ade80" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Regular Free Giveaways</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Win free $100K evaluation accounts, masterclasses, and cash prizes through our SGA giveaways without paying a single dollar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding">
        <div className="container">
          <div className="giveaway-card-box" style={{ textAlign: 'center', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, var(--bg-card) 100%)' }}>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Ready to Get Funded?</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 28px', fontSize: '1.1rem' }}>
              Compare features, pick your ideal firm, apply your SGA discount code, and enter the active giveaway today!
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-gold btn-lg" onClick={() => setActiveTab('giveaways')}>
                <Gift size={20} /> Enter Giveaway Now
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => setActiveTab('compare')}>
                Compare All Firms
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

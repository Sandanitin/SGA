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
              <Link to="/giveaways" className="btn btn-outline btn-lg" style={{ color: 'var(--navy-dark)', background: '#ffffff', borderColor: '#ffffff' }}>
                <Gift size={20} /> Explore Giveaways
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

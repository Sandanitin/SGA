import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Star, Copy, Check, ArrowLeft, ShieldCheck, DollarSign, Award, Layers } from 'lucide-react';
import { companyService } from '../services/api';
import { Loading } from '../components/Loading';
import { SEO } from '../components/SEO';

export function CompanyDetails() {
  const { slug } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadCompanyDetails();
  }, [slug]);

  const loadCompanyDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await companyService.getCompanyBySlug(slug);
      if (data) {
        setCompany(data);
      } else {
        setError('Prop firm not found or inactive.');
      }
    } catch (err) {
      setError('Unable to load company details.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <Loading message="Loading company profile..." />;

  if (error || !company) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <SEO title="Prop Firm Not Found - SGA Academy" />
        <h2>{error || 'Prop firm not found.'}</h2>
        <Link to="/prop-firms" className="btn btn-navy" style={{ marginTop: '20px', display: 'inline-flex' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to All Prop Firms
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#ffffff', minHeight: '80vh', padding: '40px 0 60px' }}>
      <SEO 
        title={`${company.company_name} Review, Promo Codes & Rules | SGA Academy`}
        description={company.short_description || `Read in-depth review, evaluation rules, maximum drawdown, profit split, and discount promo codes for ${company.company_name}.`}
        canonicalUrl={`https://sga-academy.vercel.app/prop-firms/${slug}`}
      />
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Back Link */}
        <Link to="/prop-firms" className="btn btn-outline btn-sm" style={{ marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Back to Prop Firms Matrix
        </Link>

        {/* Company Profile Header Card */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '36px', boxShadow: 'var(--shadow-card)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <img 
              src={company.logo} 
              alt={company.company_name} 
              style={{ width: '90px', height: '90px', borderRadius: '16px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '2.4rem' }}>{company.company_name}</h1>
                {company.featured === 1 && <span className="badge badge-gold">Verified SGA Partner</span>}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#b89628', fontWeight: '700' }}>
                  <Star size={16} fill="var(--gold-primary)" />
                  <span>{company.rating || 4.8} / 5.0 Rating</span>
                </div>
                <span className="text-muted">•</span>
                <span className="text-muted" style={{ fontWeight: '500' }}>{company.platform || 'MT4 / MT5'}</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '28px' }}>
            {company.short_description}
          </p>

          {/* Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="spec-label">Maximum Funding</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy-accent)', marginTop: '4px' }}>
                {company.max_funding || '$200,000'}
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="spec-label">Profit Split</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                {company.profit_split || '90/10'}
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="spec-label">Starting Price</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--green-accent)', marginTop: '4px' }}>
                {company.start_price || '$49'}
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div className="spec-label">Exclusive Discount</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#b89628', marginTop: '4px' }}>
                {company.discount || '10% OFF'}
              </div>
            </div>
          </div>

          {/* Promo Code Box */}
          <div style={{ background: '#fefce8', border: '1px dashed var(--gold-primary)', padding: '20px', borderRadius: '14px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: '600' }}>
                Exclusive SGA Promo Code
              </span>
              <span className="code-text" style={{ fontSize: '1.4rem' }}>{company.promo_code || 'SGA'}</span>
            </div>
            <button className="btn btn-outline" onClick={() => handleCopy(company.promo_code || 'SGA')}>
              {copied ? <Check size={16} color="var(--green-accent)" /> : <Copy size={16} />}
              {copied ? 'Coupon Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a 
              href={company.deal_url || company.website_url || '#'} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-gold btn-lg"
              style={{ flex: 1 }}
            >
              Claim Deal & Register <ExternalLink size={18} />
            </a>
            <a 
              href={company.website_url || '#'} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-outline btn-lg"
            >
              Visit Official Website
            </a>
          </div>

        </div>

        {/* Full Description / Review Section */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>About {company.company_name}</h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
            {company.full_description || company.short_description}
          </div>
        </div>

      </div>
    </div>
  );
}

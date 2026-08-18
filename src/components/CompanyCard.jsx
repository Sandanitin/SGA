import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, Copy, Check, Info, Flame, ShieldCheck } from 'lucide-react';

export function CompanyCard({ company, layout = 'card' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slug = company.slug || String(company.id);

  if (layout === 'horizontal-row' || layout === 'dark-row') {
    return (
      <tr>
        {/* Firm Name & Logo */}
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.company_name || company.name} 
                style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', background: '#ffffff', border: '1px solid var(--border-color)' }} 
              />
            ) : (
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                {(company.company_name || company.name || 'P').charAt(0)}
              </div>
            )}
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                {company.company_name || company.name}
              </div>
              {company.featured === 1 && (
                <span style={{ fontSize: '0.72rem', color: '#854d0e', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Flame size={11} fill="var(--gold-primary)" color="var(--gold-primary)" /> Featured Partner
                </span>
              )}
            </div>
          </div>
        </td>

        {/* Rating */}
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="star-rating-gold">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={15} 
                  fill={i < Math.floor(company.rating || 5) ? "var(--gold-primary)" : "none"} 
                  color="var(--gold-primary)" 
                />
              ))}
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
              {company.rating || '4.8'}
            </span>
          </div>
        </td>

        {/* Max Accounts */}
        <td style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '1rem' }}>
          {company.max_accounts || company.max_funding || '$200,000'}
        </td>

        {/* Trading Platforms */}
        <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '220px', lineHeight: '1.4' }}>
          {company.platform || company.platforms || 'Tradovate, NinjaTrader'}
        </td>

        {/* Discount */}
        <td style={{ color: 'var(--gold-hover)', fontWeight: '700', fontSize: '1rem' }}>
          {company.discount || '10% OFF'}
        </td>

        {/* Discount Code */}
        <td>
          <button 
            className="btn-code-pill"
            onClick={() => handleCopy(company.promo_code || 'SGA')}
          >
            {copied ? <Check size={14} color="var(--green-accent)" /> : null}
            {copied ? 'Copied!' : `Copy code: ${company.promo_code || 'SGA'}`}
          </button>
        </td>

        {/* Website Action Button */}
        <td style={{ textAlign: 'center' }}>
          <a 
            href={company.deal_url || company.website_url || '#'} 
            target="_blank" 
            rel="noreferrer" 
            className="btn-neon"
          >
            Learn more
          </a>
        </td>

      </tr>
    );
  }



  return (
    <div className="firm-card">
      {/* Top Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        {company.featured === 1 ? (
          <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '3px 7px' }}>
            <Flame size={11} /> Featured Partner
          </span>
        ) : (
          <span className="badge badge-navy" style={{ fontSize: '0.68rem', padding: '3px 7px' }}>
            <ShieldCheck size={11} /> Verified Firm
          </span>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#b89628', fontSize: '0.82rem', fontWeight: '700' }}>
          <Star size={13} fill="var(--gold-primary)" />
          {company.rating || 4.8}
        </div>
      </div>

      {/* Header Info */}
      <div className="firm-card-header" style={{ minHeight: '44px', alignItems: 'center' }}>
        <img src={company.logo} alt={company.company_name || company.name} className="firm-logo" />
        <div style={{ overflow: 'hidden' }}>
          <h3 className="firm-name" style={{ fontSize: '1.02rem', lineHeight: '1.25', margin: 0, fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {company.company_name || company.name}
          </h3>
          <span className="text-muted" style={{ fontSize: '0.74rem', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
            {company.platform || 'MT4 / MT5 / cTrader'}
          </span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-muted" style={{ fontSize: '0.8rem', minHeight: '36px', margin: '6px 0 10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.35' }}>
        {company.short_description || company.description}
      </p>

      {/* Key Specs */}
      <div className="firm-specs">
        <div>
          <span className="spec-label">Max Funding</span>
          <div className="spec-value" style={{ color: 'var(--navy-accent)' }}>{company.max_funding || '$200,000'}</div>
        </div>
        <div>
          <span className="spec-label">Profit Split</span>
          <div className="spec-value">{company.profit_split || '90/10'}</div>
        </div>
        <div>
          <span className="spec-label">Starting Price</span>
          <div className="spec-value" style={{ color: 'var(--green-accent)' }}>{company.start_price || '$49'}</div>
        </div>
        <div>
          <span className="spec-label">Discount</span>
          <div className="spec-value" style={{ color: '#b89628' }}>{company.discount || '10% OFF'}</div>
        </div>
      </div>

      {/* Promo Code Box */}
      <div className="promo-badge-box">
        <div style={{ overflow: 'hidden' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.2px' }}>Use Coupon Code</span>
          <span className="code-text" style={{ fontSize: '0.82rem' }}>{company.promo_code || 'SGA'}</span>
        </div>
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => handleCopy(company.promo_code || 'SGA')}
          style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '4px', minWidth: '58px' }}
        >
          {copied ? <Check size={12} color="var(--green-accent)" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '4px' }}>
        <Link 
          to={`/prop-firms/${slug}`} 
          className="btn btn-outline btn-sm" 
          style={{ flex: 1, padding: '7px 4px', fontSize: '0.78rem', gap: '4px', justifyContent: 'center' }}
        >
          <Info size={13} /> View Details
        </Link>
        <a 
          href={company.deal_url || company.website_url || '#'} 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-gold btn-sm" 
          style={{ flex: 1, padding: '7px 4px', fontSize: '0.78rem', gap: '4px', justifyContent: 'center' }}
        >
          Get Deal <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}


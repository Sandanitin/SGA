import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ExternalLink, Flame, Info } from 'lucide-react';

export function DealCard({ company }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slug = company.slug || String(company.id);

  return (
    <div className="firm-card" style={{ borderTop: '3px solid var(--gold-primary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span className="badge badge-gold">
          <Flame size={12} /> {company.discount || 'UP TO 90% OFF'}
        </span>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-accent)' }}>
          Limited Deal
        </span>
      </div>

      <div className="firm-card-header">
        <img src={company.logo} alt={company.company_name} className="firm-logo" />
        <div>
          <h3 className="firm-name">{company.company_name}</h3>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>
            Max Funding: {company.max_funding || '$200,000'}
          </span>
        </div>
      </div>

      <p className="text-muted" style={{ fontSize: '0.88rem', margin: '8px 0 16px', minHeight: '42px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {company.short_description}
      </p>

      <div className="promo-badge-box">
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Promo Code</span>
          <span className="code-text">{company.promo_code || 'ONLYPROP'}</span>
        </div>
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => handleCopy(company.promo_code || 'ONLYPROP')}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          {copied ? <Check size={14} color="var(--green-accent)" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <Link to={`/prop-firms/${slug}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
          <Info size={14} /> Details
        </Link>
        <a href={company.deal_url || company.website_url || '#'} target="_blank" rel="noreferrer" className="btn btn-gold btn-sm" style={{ flex: 1 }}>
          Get Deal <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

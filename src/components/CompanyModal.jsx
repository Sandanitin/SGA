import React from 'react';
import { X, Star, ExternalLink, ShieldCheck, CheckCircle2, DollarSign, Award, Layers } from 'lucide-react';

export function CompanyModal({ company, onClose }) {
  if (!company) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <img 
            src={company.logo} 
            alt={company.name} 
            style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.6rem' }}>{company.name}</h2>
              {company.featured === 1 && <span className="badge badge-gold">Verified Partner</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', marginTop: '4px' }}>
              <Star size={16} fill="var(--gold-primary)" />
              <span style={{ fontWeight: '700' }}>{company.rating}</span>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>({company.reviews_count || 320} reviews)</span>
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.7' }}>
          {company.description}
        </p>

        {/* Highlight Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(6, 13, 25, 0.8)', padding: '16px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Maximum Funding</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--gold-light)', marginTop: '4px' }}>{company.max_funding}</div>
          </div>
          <div style={{ background: 'rgba(6, 13, 25, 0.8)', padding: '16px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Profit Split</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>{company.profit_split}</div>
          </div>
          <div style={{ background: 'rgba(6, 13, 25, 0.8)', padding: '16px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Starting Fee</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#4ade80', marginTop: '4px' }}>{company.start_price}</div>
          </div>
          <div style={{ background: 'rgba(6, 13, 25, 0.8)', padding: '16px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Platforms</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', marginTop: '4px' }}>{company.platform}</div>
          </div>
        </div>

        {/* Promo Discount Box */}
        <div style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px dashed var(--gold-primary)', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Exclusive SGA / OnlyPropFirms Coupon
          </span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--gold-light)', letterSpacing: '2px', fontFamily: 'monospace' }}>
            {company.discount_code || 'OPF10'} ({company.discount_percentage || '10% OFF'})
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a 
            href={company.referral_url || '#'} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-gold" 
            style={{ flex: 1 }}
          >
            Claim Offer & Visit Firm <ExternalLink size={16} />
          </a>
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

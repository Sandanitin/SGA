import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export function OfficialRulesModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <ShieldCheck size={28} color="var(--gold-primary)" />
          <h2 style={{ fontSize: '1.5rem' }}>Official Giveaway Rules</h2>
        </div>

        <div className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            <strong style={{ color: '#fff' }}>1. Eligibility:</strong> SGA Giveaways are open to legal residents and active online traders worldwide aged 18 or older at the time of entry.
          </p>
          <p>
            <strong style={{ color: '#fff' }}>2. Entry Limit:</strong> Limit one (1) entry per trader per giveaway draw. Multiple submissions with duplicate YouTube handles or email addresses will be disqualified.
          </p>
          <p>
            <strong style={{ color: '#fff' }}>3. How Winners are Selected:</strong> Winners are chosen at random from all verified entries submitted before the monthly deadline. Winners will be announced on the official SGA YouTube channel & notified via registered email.
          </p>
          <p>
            <strong style={{ color: '#fff' }}>4. Prizes:</strong> Prizes include free $100K / $200K evaluation accounts provided by partner prop firms, SGA trading masterclass access, and cash rewards. Prizes are non-transferable.
          </p>
          <p>
            <strong style={{ color: '#fff' }}>5. Verification:</strong> Winners must respond within 7 business days of notification with valid proof of identity and YouTube channel verification.
          </p>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <button className="btn btn-gold btn-sm" onClick={onClose}>
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}

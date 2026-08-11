import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Twitter, Instagram, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="OnlyPropFirms / SGA Academy" 
                style={{ height: '44px', marginBottom: '16px' }} 
              />
            </Link>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '20px', maxWidth: '340px' }}>
              OnlyPropFirms by Sheshu Gundla Academy (SGA) is the premier directory for verified prop firm evaluations, maximum coupon discounts, and trader giveaways.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" aria-label="YouTube">
                <Youtube size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/" className="text-muted" style={{ textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/prop-firms" className="text-muted" style={{ textDecoration: 'none' }}>Prop Firms Comparison</Link></li>
              <li><Link to="/giveaways" className="text-muted" style={{ textDecoration: 'none' }}>Monthly Giveaways</Link></li>
              <li><Link to="/contact" className="text-muted" style={{ textDecoration: 'none' }}>Contact Us</Link></li>
              <li><Link to="/admin/login" className="text-muted" style={{ textDecoration: 'none' }}>Admin Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li className="text-muted">Instant Funding Firms</li>
              <li className="text-muted">Futures Prop Firms</li>
              <li className="text-muted">No Time Limits</li>
              <li className="text-muted">90% Payout Splits</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Stay Updated</h4>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
              Get instant alerts for high-percentage promo drops and trader giveaways.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="form-input" 
                style={{ padding: '10px 14px', fontSize: '0.85rem' }} 
              />
              <button className="btn btn-navy btn-sm">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} OnlyPropFirms / Sheshu Gundla Academy (SGA). All rights reserved.
          </div>
          <div style={{ fontSize: '0.85rem' }}>
            Designed & Developed by{' '}
            <a 
              href="https://www.vikrin.com/" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--navy-accent)', fontWeight: '700', textDecoration: 'none' }}
            >
              Vikrin Pvt Ltd
            </a>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Risk Disclaimer</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

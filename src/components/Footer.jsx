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
                alt="SGA Academy - Sheshu Gundla Academy" 
                style={{ height: '44px', marginBottom: '16px' }} 
              />
            </Link>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '20px', maxWidth: '340px' }}>
              Sheshu Gundla Academy (SGA) is dedicated to helping unemployed youth, job seekers, and aspiring traders build disciplined market skills through structured education, risk management, and community practice.
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
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Education</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/" className="text-muted" style={{ textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/prop-firms" className="text-muted" style={{ textDecoration: 'none' }}>Evaluation Matrix</Link></li>
              <li><Link to="/giveaways" className="text-muted" style={{ textDecoration: 'none' }}>Giveaways</Link></li>
              <li><Link to="/contact" className="text-muted" style={{ textDecoration: 'none' }}>Mentorship & Contact</Link></li>
              <li><Link to="/admin/login" className="text-muted" style={{ textDecoration: 'none' }}>Admin Access</Link></li>
            </ul>
          </div>

          {/* Core Foundations */}
          <div>
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Core Pillars</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li className="text-muted">Market Mechanics & Structure</li>
              <li className="text-muted">Risk & Drawdown Control</li>
              <li className="text-muted">Trader Psychology & Mindset</li>
              <li className="text-muted">Peer Community Practice</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Academy Updates</h4>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
              Join our mailing list for weekly Telugu market insights and educational guides.
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

        {/* Educational Risk Disclaimer & Copyright */}
        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.82rem', color: '#64748b', border: '1px solid #e2e8f0', lineHeight: 1.6 }}>
          <strong>Educational Disclaimer:</strong> Trading financial markets involves significant risk of capital loss and is not suitable for everyone. Sheshu Gundla Academy (SGA) provides structured educational content, market analysis tools, risk management frameworks, and community discussions strictly for informational and learning purposes. We do not provide financial, investment, or legal advice. Education before execution.
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Sheshu Gundla Academy (SGA). All rights reserved.
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
            <span>Terms of Service</span>
            <span>Educational Disclaimer</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

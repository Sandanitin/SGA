import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '80vh', padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-navy" style={{ marginBottom: '12px' }}>SUPPORT & INQUIRIES</span>
          <h1 style={{ fontSize: '2.8rem' }}>Contact OnlyPropFirms & SGA</h1>
          <p className="text-muted" style={{ fontSize: '1.05rem', marginTop: '8px' }}>
            Have questions about prop firm deals or giveaway partnerships? Reach out to our team.
          </p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '40px', boxShadow: 'var(--shadow-card)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--green-accent)' }}>
              <CheckCircle2 size={48} style={{ marginBottom: '16px' }} />
              <h2 style={{ color: 'var(--text-main)', marginBottom: '8px' }}>Thank You for Reaching Out!</h2>
              <p className="text-muted">Your message has been sent. We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-input" placeholder="Full Name" required />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="you@example.com" required />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" rows="5" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="btn btn-navy btn-lg" style={{ width: '100%' }}>
                Send Message <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

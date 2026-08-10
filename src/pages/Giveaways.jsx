import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, AlertCircle, Trophy, User, Mail, Youtube, ShieldCheck } from 'lucide-react';
import { giveawayService } from '../services/api';

export function Giveaways() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    youtube_username: '',
    email: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showRulesModal, setShowRulesModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!formData.first_name || !formData.last_name || !formData.youtube_username || !formData.email) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('You must agree to the giveaway terms to enter.');
      return;
    }

    setLoading(true);
    try {
      const res = await giveawayService.submitGiveaway(formData);
      setSuccessMessage('Your entry has been submitted successfully.');
      setFormData({
        first_name: '',
        last_name: '',
        youtube_username: '',
        email: '',
        consent: false
      });
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred submitting your entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '80vh', paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '50px 0 30px' }}>
        <div className="container">
          <div style={{ marginBottom: '12px' }}>
            <span className="badge badge-gold">
              <Gift size={14} /> EXCLUSIVE TRADER DRAW
            </span>
          </div>

          <h1 className="hero-title" style={{ fontSize: '3.2rem' }}>
            Enter Now to Win
          </h1>

          <div style={{ maxWidth: '820px', margin: '0 auto 36px', background: 'var(--bg-secondary)', padding: '28px 36px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              At OnlyPropFirms, you know how we do it—always bringing you the best deals, discounts, and epic giveaways! We're all about helping traders reach new heights with offers you can't find anywhere else. Want in? It's easy—just fill out the form below for a chance to win evaluation accounts, course access, cash prizes, and more. Don't miss out—level up your trading journey today with OnlyPropFirms! Who will win? Could be you?
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Card */}
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '40px', boxShadow: 'var(--shadow-card)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <Trophy size={32} color="var(--gold-primary)" />
            <div>
              <h2 style={{ fontSize: '1.6rem' }}>Giveaway Registration Form</h2>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Fill in your info below to enter the live monthly prize draw.</p>
            </div>
          </div>

          {/* Notifications */}
          {successMessage && (
            <div style={{ background: '#d1fae5', border: '1px solid #a7f3d0', padding: '16px', borderRadius: '10px', color: '#065f46', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
              <CheckCircle2 size={20} />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '16px', borderRadius: '10px', color: '#991b1b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* First Name */}
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    name="first_name"
                    className="form-input" 
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    name="last_name"
                    className="form-input" 
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* YouTube Username */}
              <div className="form-group">
                <label className="form-label">YouTube Username *</label>
                <div style={{ position: 'relative' }}>
                  <Youtube size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#ff0000' }} />
                  <input 
                    type="text" 
                    name="youtube_username"
                    className="form-input" 
                    placeholder="@YourYouTubeHandle"
                    value={formData.youtube_username}
                    onChange={handleChange}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    name="email"
                    className="form-input" 
                    placeholder="trader@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>

            </div>

            {/* Consent Checkbox */}
            <div className="form-group" style={{ marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="consent" 
                  checked={formData.consent}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--navy-accent)', width: '18px', height: '18px', marginTop: '2px' }}
                  required
                />
                <span>
                  I confirm that I have subscribed to OnlyPropFirms & SGA YouTube, and I agree to the giveaway terms.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px', flexWrap: 'wrap', gap: '16px' }}>
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', color: 'var(--navy-accent)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
                onClick={() => setShowRulesModal(true)}
              >
                Official Giveaway Rules
              </button>

              <button 
                type="submit" 
                className="btn btn-gold btn-lg" 
                disabled={loading}
              >
                {loading ? 'Submitting Entry...' : 'Enter Now'} <Sparkles size={18} />
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Official Rules Modal */}
      {showRulesModal && (
        <div className="modal-overlay" onClick={() => setShowRulesModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Official Giveaway Rules</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p><strong>1. Eligibility:</strong> Open to active online traders worldwide aged 18 or older.</p>
              <p><strong>2. Single Entry:</strong> Limit one (1) submission per trader per draw.</p>
              <p><strong>3. Selection:</strong> Winners are selected randomly and announced on the SGA YouTube channel.</p>
              <p><strong>4. Verification:</strong> Winners must respond within 7 days with valid channel verification.</p>
            </div>
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button className="btn btn-navy btn-sm" onClick={() => setShowRulesModal(false)}>
                Close Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

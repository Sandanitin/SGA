import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, AlertCircle, ShieldCheck, Trophy, Youtube, User, Mail } from 'lucide-react';
import { apiService } from '../services/api';
import { OfficialRulesModal } from '../components/OfficialRulesModal';

export function GiveawaysPage() {
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
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('You must agree to the giveaway terms to enter.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiService.submitGiveaway(formData);
      setSuccessMessage(res.message || 'Entry submitted successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        youtube_username: '',
        email: '',
        consent: false
      });
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while submitting entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '60px 0 30px' }}>
        <div className="container">
          <div className="hero-badge">
            <span className="badge badge-gold">
              <Gift size={14} /> EXCLUSIVE MONTHLY DRAW
            </span>
          </div>

          <h1 className="hero-title" style={{ fontSize: '3.2rem' }}>
            Enter Now to Win
          </h1>

          <div style={{ maxWidth: '800px', margin: '0 auto 36px', background: 'rgba(12, 24, 43, 0.6)', padding: '24px 32px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              At OnlyPropFirms, you know how we do it—always bringing you the best deals, discounts, and epic giveaways! We're all about helping traders reach new heights with offers you can't find anywhere else. Want in? It's easy—just fill out the form below for a chance to win evaluation accounts, course access, cash prizes, and more. Don't miss out—level up your trading journey today with OnlyPropFirms! Who will win? Could be you?
            </p>
          </div>
        </div>
      </section>

      {/* Main Registration Form & Giveaways Grid */}
      <section className="section-padding" style={{ paddingTop: '0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div className="giveaway-card-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Trophy size={28} color="var(--gold-primary)" />
              <div>
                <h2 style={{ fontSize: '1.6rem' }}>Giveaway Registration Form</h2>
                <p className="text-muted" style={{ fontSize: '0.88rem' }}>Fill out your details to submit your entry into the active database.</p>
              </div>
            </div>

            {/* Notifications */}
            {successMessage && (
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', padding: '16px', borderRadius: '10px', color: '#4ade80', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '16px', borderRadius: '10px', color: '#f87171', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
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
                      placeholder="e.g. Sheshu"
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
                      placeholder="e.g. Gundla"
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
                      placeholder="e.g. @SheshuGundlaTrades"
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
                <label className="checkbox-group">
                  <input 
                    type="checkbox" 
                    name="consent" 
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    I confirm that I have subscribed to OnlyPropFirms & SGA YouTube, and I agree to the giveaway terms.
                  </span>
                </label>
              </div>

              {/* Action Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <button 
                  type="button" 
                  className="rules-link"
                  onClick={() => setShowRulesModal(true)}
                >
                  Read Official Giveaway Rules
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

          {/* Active Giveaway Rewards Showcase */}
          <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>GRAND PRIZE</span>
              <h3 style={{ fontSize: '1.2rem', margin: '6px 0' }}>$100,000 Evaluation Account</h3>
              <p className="text-muted" style={{ fontSize: '0.88rem' }}>Provided by partner prop firm with full 90% profit split capabilities.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>2ND PRIZE</span>
              <h3 style={{ fontSize: '1.2rem', margin: '6px 0' }}>SGA Masterclass Pass</h3>
              <p className="text-muted" style={{ fontSize: '0.88rem' }}>Full access to Sheshu Gundla Academy's advanced price action trading strategy course.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
              <span className="badge badge-green" style={{ marginBottom: '8px' }}>3RD PRIZE</span>
              <h3 style={{ fontSize: '1.2rem', margin: '6px 0' }}>$500 Cash Reward</h3>
              <p className="text-muted" style={{ fontSize: '0.88rem' }}>Direct cash prize sent via crypto or bank transfer to chosen winners.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Official Rules Modal */}
      {showRulesModal && (
        <OfficialRulesModal onClose={() => setShowRulesModal(false)} />
      )}
    </div>
  );
}

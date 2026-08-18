import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, AlertCircle, Trophy, User, Mail, Youtube, ShieldCheck } from 'lucide-react';
import { giveawayService } from '../services/api';
import { SEO } from '../components/SEO';

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
      setErrorMessage('You must confirm subscription to SGA Telugu Youtube channel.');
      return;
    }

    setLoading(true);
    const result = await giveawayService.entryGiveaway(formData);
    setLoading(false);

    if (result.success) {
      setSuccessMessage(result.message || 'Successfully entered the giveaway!');
      setFormData({ first_name: '', last_name: '', youtube_username: '', email: '', consent: false });
    } else {
      setErrorMessage(result.message || 'Failed to enter giveaway. Please try again.');
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '80vh', padding: '36px 0 60px' }}>
      <SEO 
        title="Win Free Prop Firm Evaluation Accounts - SGA Giveaways"
        description="Participate in SGA Trading Academy monthly giveaways to win free prop firm evaluation accounts and cash rewards."
        canonicalUrl="https://sga-academy.vercel.app/giveaways"
      />
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="giveaway-redesign-grid">
          
          {/* LEFT SIDE - 50% */}
          <div className="giveaway-left-column">
            {/* Badge */}
            <div style={{ marginBottom: '16px' }}>
              <span className="badge badge-gold">
                <Gift size={14} /> EXCLUSIVE TRADER DRAW
              </span>
            </div>

            {/* Heading */}
            <h1 className="hero-title" style={{ fontSize: '3.2rem', textAlign: 'left', margin: '0 0 20px', color: 'var(--text-main)' }}>
              Enter Now to Win
            </h1>

            {/* Description Text */}
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.75', marginBottom: '32px' }}>
              At SGA, you know how we do it—always bringing you the best deals, discounts, and epic giveaways! We're all about helping traders reach new heights with offers you can't find anywhere else. Want in? It's easy—just fill out the form below for a chance to win evaluation accounts, course access, cash prizes, and more. Don't miss out—level up your trading journey today with SGA! Who will win? Could be you?
            </p>

            {/* 4 Prize Highlights */}
            <div className="prize-highlights-grid">
              <div className="prize-highlight-item">
                <Trophy size={20} color="var(--gold-primary)" />
                <span>Evaluation Accounts</span>
              </div>
              <div className="prize-highlight-item">
                <Sparkles size={20} color="var(--gold-primary)" />
                <span>Course Access</span>
              </div>
              <div className="prize-highlight-item">
                <ShieldCheck size={20} color="var(--gold-primary)" />
                <span>Cash Prizes</span>
              </div>
              <div className="prize-highlight-item">
                <Gift size={20} color="var(--gold-primary)" />
                <span>And More</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - 50% */}

          <div className="giveaway-right-column">
            <div className="giveaway-form-card">
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                <Trophy size={28} color="var(--gold-primary)" />
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)' }}>Giveaway Registration Form</h2>
                  <p className="text-muted" style={{ fontSize: '0.88rem' }}>Fill out your details to submit your entry into the active database.</p>
                </div>
              </div>

              {/* Notifications */}
              {successMessage && (
                <div style={{ background: '#d1fae5', border: '1px solid #a7f3d0', padding: '14px 18px', borderRadius: '10px', color: '#065f46', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                  <CheckCircle2 size={18} />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '14px 18px', borderRadius: '10px', color: '#991b1b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-two-col">
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

                <div className="form-two-col">
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
                <div className="form-group" style={{ marginTop: '6px', marginBottom: '20px' }}>
                  <label className="checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      name="consent" 
                      checked={formData.consent}
                      onChange={handleChange}
                      style={{ accentColor: 'var(--gold-primary)', width: '18px', height: '18px', marginTop: '2px' }}
                      required
                    />
                    <span>
                      I confirm that I have subscribed to SGA YouTube, and I agree to the giveaway terms.
                    </span>
                  </label>
                </div>

                {/* Action Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
                  <button 
                    type="button" 
                    className="rules-link"
                    style={{ background: 'none', border: 'none', color: 'var(--navy-accent)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', padding: 0 }}
                    onClick={() => setShowRulesModal(true)}
                  >
                    Official Giveaway Rules
                  </button>

                  <button 
                    type="submit" 
                    className="btn btn-gold btn-lg" 
                    disabled={loading}
                    style={{ padding: '14px 32px' }}
                  >
                    {loading ? 'Submitting Entry...' : 'Enter Now'} <Sparkles size={18} />
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Official Rules Modal */}
      {showRulesModal && (
        <OfficialRulesModal onClose={() => setShowRulesModal(false)} />
      )}
    </div>
  );

}

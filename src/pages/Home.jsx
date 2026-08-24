import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Target, 
  Award, 
  ArrowRight, 
  Brain, 
  Compass, 
  Gift, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Quote, 
  BarChart3,
  Scale,
  Zap
} from 'lucide-react';
import { companyService } from '../services/api';
import { CompanyCard } from '../components/CompanyCard';
import { Loading } from '../components/Loading';
import { SEO } from '../components/SEO';
import { WhyChooseUs } from '../components/WhyChooseUs';

export function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await companyService.getCompanies();
    setCompanies(data);
    setLoading(false);
  };

  return (
    <div style={{ background: '#ffffff', color: 'var(--text-main)' }}>
      <SEO 
        title="SGA Academy - Master Market Discipline & Prop Firm Comparisons"
        description="Empowering traders with structured trading education, proprietary firm evaluation matrix, and free account giveaways."
        canonicalUrl="https://sga-academy.vercel.app/"
      />
      {/* 1. HERO SECTION - Educational Context */}
      <section className="hero-section">
        {/* Subtle Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
        >
          <source src="/307615_medium.mp4" type="video/mp4" />
        </video>

        <div className="hero-video-overlay" />

        <div className="container hero-content">
          <div style={{ marginBottom: '16px' }}>
            <span className="badge badge-edu" style={{ fontSize: '0.85rem', padding: '6px 16px', letterSpacing: '0.5px' }}>
              <BookOpen size={14} style={{ marginRight: '6px' }} />
              SGA ACADEMY • UNEMPLOYED & JOB SEEKERS INITIATIVE
            </span>
          </div>

          <h1 className="hero-title">
            Learn Like It's Your Job. <br />
            <span className="text-gold">Build Skills with Discipline.</span>
          </h1>

          <p className="hero-subtitle">
            Helping unemployed youth, job seekers, beginners, and aspiring traders build disciplined market skills through structured trading education.
          </p>

          <div className="hero-actions">
            <a href="#foundations" className="btn btn-gold btn-lg">
              START LEARNING FREE <ArrowRight size={18} />
            </a>
            <a href="#community" className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
              <Users size={18} /> Join Community
            </a>
          </div>
        </div>
      </section>

      {/* 2. BRAND POSITIONING BANNER */}
      <section className="brand-positioning-bar">
        <div className="container">
          <div className="positioning-grid">
            <div className="positioning-item">
              <span className="positioning-title text-gold">Education Before Execution.</span>
              <span className="positioning-sub">Build knowledge before taking market risk</span>
            </div>
            <div className="positioning-item">
              <span className="positioning-title text-gold">Discipline Before Profit.</span>
              <span className="positioning-sub">Master capital control before chasing gains</span>
            </div>
            <div className="positioning-item">
              <span className="positioning-title text-gold">Process Before Results.</span>
              <span className="positioning-sub">Focus on routine execution & consistency</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPORTING STATEMENT & FOUNDATION PILLARS */}
      <section id="foundations" className="section-padding bg-light">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
            <span className="badge badge-navy" style={{ marginBottom: '12px' }}>CORE METHODOLOGY</span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>
              Learn the Skill. Respect the Process.
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              We focus on building the right foundation: market understanding, risk management, trading psychology, discipline, and consistency.
            </p>
          </div>

          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {/* Pillar 1 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <BarChart3 size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>1. Market Understanding</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Master price action mechanics, market structure, liquidity concepts, and technical charting principles from the ground up.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#ecfdf5', color: '#059669' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>2. Risk Management</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Learn exact position sizing formulas, drawdown limits, stop-loss placement, and asymmetric risk-to-reward ratios.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#fef3c7', color: '#b45309' }}>
                <Brain size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>3. Trading Psychology</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Develop emotional resilience, eliminate FOMO and revenge trading, and cultivate patience during market drawdowns.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-card">
              <div className="pillar-icon-box" style={{ background: '#f3e8ff', color: '#6b21a8' }}>
                <Target size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>4. Discipline & Consistency</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Build systematic daily trading routines, maintain trade journals, perform backtesting, and refine your rules over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRUCTURED CAPITAL EVALUATION DIRECTORY MATRIX */}
      <section className="section-padding bg-light">
        <div className="container" style={{ maxWidth: '1440px' }}>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="badge badge-navy" style={{ marginBottom: '8px' }}>PRACTICE & SKILL TESTING LABS</span>
            <h2 className="section-title">Capital Evaluation Matrix</h2>
            <p className="section-subtitle" style={{ maxWidth: '650px', margin: '6px auto 0' }}>
              Compare evaluation parameters, drawdown thresholds, platform support, and rules to practice your trading edge in structured simulated environments.
            </p>
          </div>

          {loading ? (
            <Loading message="Loading evaluation matrix..." />
          ) : (
            <div className="cards-5-grid" style={{ marginTop: '36px' }}>
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} layout="card" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Traders Trust SGA Section */}
      <WhyChooseUs />

      {/* 5. MISSION & STORY SECTION */}
      <section className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="mission-container">
            <span className="mission-quote-mark">“</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span className="badge badge-gold-subtle" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={14} /> OUR MISSION & PURPOSE
              </span>
            </div>

            <blockquote className="mission-quote">
              "My mission is to help unemployed youth, job seekers, beginners, and aspiring traders understand the financial markets through proper education, disciplined risk management, and practical market knowledge — not unrealistic promises of quick profits."
            </blockquote>

            <div className="mission-author">
              <div className="author-avatar">SG</div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '1.15rem', margin: 0 }}>Sheshu Gundla</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Founder & Lead Mentor, SGA Academy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RISK MANAGEMENT SPOTLIGHT */}
      <section className="section-padding risk-section-bg">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 44px' }}>
            <span className="badge badge-green" style={{ marginBottom: '10px' }}>CAPITAL PROTECTION FIRST</span>
            <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              Protect Your Capital. Control Your Risk.
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1.05rem' }}>
              Learn how to manage risk, position size, drawdowns, and trading psychology before chasing profits.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="risk-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Scale size={22} color="#059669" />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Position Sizing Rules</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Calculate exact lot sizes tailored to account equity so you never risk more than 1% to 2% on any single trade setup.
              </p>
            </div>

            <div className="risk-card" style={{ borderLeftColor: '#0284c7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <ShieldCheck size={22} color="#0284c7" />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Drawdown Prevention</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Set hard daily loss limits and trailing drawdown buffers to keep your account safe through inevitable losing streaks.
              </p>
            </div>

            <div className="risk-card" style={{ borderLeftColor: '#d97706' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <TrendingUp size={22} color="#d97706" />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Risk-to-Reward Ratio</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Focus exclusively on high probability, asymmetric trade setups with at least 1:2 or 1:3 risk-to-reward metrics.
              </p>
            </div>

            <div className="risk-card" style={{ borderLeftColor: '#7c3aed' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Brain size={22} color="#7c3aed" />
                <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Psychological Control</h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Master emotional discipline: stop overtrading, accept small losses calmly, and follow execution rules without bias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY SECTION */}
      <section id="community" className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 44px' }}>
            <span className="badge badge-navy" style={{ marginBottom: '10px' }}>UNEMPLOYED & JOB SEEKERS COMMUNITY</span>
            <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              Learn Together. Grow Together.
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1.05rem' }}>
              Join a community of like-minded traders where you can learn, share experiences, discuss the markets, and improve through consistent practice.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            <div className="community-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#eff6ff', color: 'var(--navy-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Users size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Unemployed & Job Seekers Network</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Connect with Telugu youth, unemployed individuals, and job seekers sharing the same passion for market mastery and business skills.
              </p>
              <Link to="/contact" className="btn btn-outline btn-sm">
                Join Community Group
              </Link>
            </div>

            <div className="community-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fef9c3', color: '#854d0e', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <BookOpen size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Market Breakdown Sessions</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Participate in structured weekly chart study sessions to analyze live market context, key levels, and risk setups.
              </p>
              <Link to="/giveaways" className="btn btn-outline btn-sm">
                Explore Community Perks
              </Link>
            </div>

            <div className="community-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#d1fae5', color: '#065f46', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <CheckCircle2 size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Peer Journal & Review</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Share trading journals, review mistakes constructively with peers, and maintain consistent accountability.
              </p>
              <Link to="/contact" className="btn btn-outline btn-sm">
                Get Mentorship Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ACADEMY CTA BANNER */}
      <section className="section-padding">
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: '#ffffff', padding: '56px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: 'var(--shadow-hover)', border: '1px solid rgba(212,175,55,0.3)' }}>
            <h2 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '16px' }}>
              Ready to Build Your Trading Skills?
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '0 auto 32px', fontSize: '1.1rem' }}>
              Join hundreds of unemployed youth, job seekers, and aspiring traders learning market mechanics, capital protection, and disciplined trade execution with SGA Academy.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-gold btn-lg">
                Connect with Mentors
              </Link>
              <Link to="/prop-firms" className="btn btn-outline btn-lg" style={{ color: '#ffffff', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }}>
                Compare Evaluation Labs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

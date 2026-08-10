import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Users, Flame, CheckCircle, LogOut, Plus, BarChart2 } from 'lucide-react';
import { companyService, giveawayService, authService } from '../../services/api';
import { Loading } from '../../components/Loading';

export function Dashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    activeCompanies: 0,
    featuredCompanies: 0,
    giveawayEntries: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    setLoading(true);
    const comps = await companyService.getCompanies({ admin: true });
    const gives = await giveawayService.getGiveaways();

    setStats({
      totalCompanies: comps.length,
      activeCompanies: comps.filter(c => c.status === 'active').length,
      featuredCompanies: comps.filter(c => c.featured === 1).length,
      giveawayEntries: gives.length
    });
    setLoading(false);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem' }}>Admin Dashboard</h1>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              Manage website prop firm listings and giveaway entries.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/admin/companies" className="btn btn-navy btn-sm">
              <Building size={16} /> Manage Companies
            </Link>
            <Link to="/admin/giveaways" className="btn btn-gold btn-sm">
              <Users size={16} /> Manage Giveaways
            </Link>
            <button className="btn btn-outline btn-sm" onClick={handleLogout} style={{ color: '#dc2626' }}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Metric Cards */}
        {loading ? (
          <Loading message="Loading metrics..." />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Companies</span>
                <Building color="var(--navy-accent)" size={24} />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: '800' }}>{stats.totalCompanies}</div>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Active Companies</span>
                <CheckCircle color="var(--green-accent)" size={24} />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--green-accent)' }}>{stats.activeCompanies}</div>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Featured Companies</span>
                <Flame color="#b89628" size={24} />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#b89628' }}>{stats.featuredCompanies}</div>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="text-muted" style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Giveaway Entries</span>
                <Users color="var(--gold-primary)" size={24} />
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--gold-primary)' }}>{stats.giveawayEntries}</div>
            </div>

          </div>
        )}

        {/* Action Panel */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Quick Management Actions</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/admin/companies" className="btn btn-navy">
              <Plus size={16} /> Add / Edit Prop Firm Companies
            </Link>
            <Link to="/admin/giveaways" className="btn btn-outline">
              <Users size={16} /> View & Export Giveaway Entries CSV
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

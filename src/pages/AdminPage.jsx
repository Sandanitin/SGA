import React, { useState, useEffect } from 'react';
import { 
  UserCheck, Lock, LogOut, Plus, Edit3, Trash2, Download, 
  Search, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, X, Building, Users 
} from 'lucide-react';
import { apiService } from '../services/api';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ username: 'admin', password: 'admin123' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('companies'); // 'companies' | 'giveaways'
  
  // Company state
  const [companies, setCompanies] = useState([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyForm, setCompanyForm] = useState({
    name: '',
    logo: '',
    description: '',
    max_funding: '$200,000',
    profit_split: '80/20 - 90%',
    start_price: '$49',
    rating: 4.8,
    discount_code: 'OPF10',
    discount_percentage: '10% OFF',
    referral_url: 'https://',
    featured: 1,
    top_deal: 0,
    platform: 'MT4, MT5, cTrader'
  });

  // Giveaways state
  const [giveaways, setGiveaways] = useState([]);
  const [giveawaySearch, setGiveawaySearch] = useState('');

  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Check local session
    const token = sessionStorage.getItem('opf_admin_token');
    if (token) {
      setIsAuthenticated(true);
      loadAdminData();
    }
  }, []);

  const loadAdminData = async () => {
    const compData = await apiService.getCompanies();
    setCompanies(compData);
    const giveData = await apiService.getGiveaways();
    setGiveaways(giveData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await apiService.adminLogin(loginCreds.username, loginCreds.password);
      sessionStorage.setItem('opf_admin_token', res.token);
      setIsAuthenticated(true);
      loadAdminData();
    } catch (err) {
      setLoginError(err.message || 'Invalid administrator login credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('opf_admin_token');
    setIsAuthenticated(false);
  };

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Company Actions
  const handleOpenNewCompany = () => {
    setEditingCompany(null);
    setCompanyForm({
      name: '',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150',
      description: '',
      max_funding: '$200,000',
      profit_split: '80/20 - 90%',
      start_price: '$49',
      rating: 4.8,
      discount_code: 'OPF10',
      discount_percentage: '10% OFF',
      referral_url: 'https://',
      featured: 1,
      top_deal: 0,
      platform: 'MT4, MT5, cTrader'
    });
    setShowCompanyModal(true);
  };

  const handleOpenEditCompany = (company) => {
    setEditingCompany(company);
    setCompanyForm({ ...company });
    setShowCompanyModal(true);
  };

  const handleSaveCompany = async (e) => {
    e.preventDefault();
    if (editingCompany) {
      await apiService.updateCompany({ ...companyForm, id: editingCompany.id });
      showNotify(`Updated company "${companyForm.name}" successfully!`);
    } else {
      await apiService.createCompany(companyForm);
      showNotify(`Added new company "${companyForm.name}" successfully!`);
    }
    setShowCompanyModal(false);
    loadAdminData();
  };

  const handleDeleteCompany = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await apiService.deleteCompany(id);
      showNotify(`Company "${name}" deleted.`);
      loadAdminData();
    }
  };

  // Export Giveaways CSV
  const handleExportCSV = () => {
    if (giveaways.length === 0) return;

    const headers = ['ID', 'First Name', 'Last Name', 'YouTube Username', 'Email', 'Consent', 'Status', 'Submitted At'];
    const rows = giveaways.map((g) => [
      g.id,
      `"${g.first_name}"`,
      `"${g.last_name}"`,
      `"${g.youtube_username}"`,
      `"${g.email}"`,
      g.consent ? 'Yes' : 'No',
      g.status || 'Verified',
      `"${g.created_at}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sga_giveaway_entries_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotify('Exported giveaway participants to CSV!');
  };

  // Filter giveaways by search
  const filteredGiveaways = giveaways.filter(g => 
    g.first_name.toLowerCase().includes(giveawaySearch.toLowerCase()) ||
    g.last_name.toLowerCase().includes(giveawaySearch.toLowerCase()) ||
    g.email.toLowerCase().includes(giveawaySearch.toLowerCase()) ||
    g.youtube_username.toLowerCase().includes(giveawaySearch.toLowerCase())
  );

  // If not logged in, render Admin Login Card
  if (!isAuthenticated) {
    return (
      <div style={{ padding: '80px 20px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '440px', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img src="/logo.png" alt="SGA" style={{ height: '48px', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.6rem' }}>Admin Portal Login</h2>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              Secure management dashboard for SGA.
            </p>
          </div>

          {loginError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '8px', color: '#f87171', fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-input"
                value={loginCreds.username}
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input"
                value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '10px' }} disabled={loginLoading}>
              {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--gold-light)', textAlign: 'center' }}>
            Demo Admin Credentials:<br/>
            Username: <strong>admin</strong> | Password: <strong>admin123</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* Admin Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '2rem' }}>Administrator Dashboard</h1>
              <span className="badge badge-green">LIVE SESSION</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              Manage prop firm directory listings and review user giveaway entries.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-outline btn-sm" onClick={loadAdminData}>
              <RefreshCw size={14} /> Refresh Data
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleLogout} style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Global Notification Toast */}
        {notification && (
          <div style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #4ade80', color: '#4ade80', padding: '14px 20px', borderRadius: '10px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={18} /> {notification}
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '32px' }}>
          <button 
            className={`btn ${activeTab === 'companies' ? 'btn-gold' : 'btn-outline'}`}
            onClick={() => setActiveTab('companies')}
          >
            <Building size={16} /> Company Management ({companies.length})
          </button>
          <button 
            className={`btn ${activeTab === 'giveaways' ? 'btn-gold' : 'btn-outline'}`}
            onClick={() => setActiveTab('giveaways')}
          >
            <Users size={16} /> Giveaway Participants ({giveaways.length})
          </button>
        </div>

        {/* TAB 1: Company Management */}
        {activeTab === 'companies' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Prop Firm Listings</h3>
              <button className="btn btn-gold btn-sm" onClick={handleOpenNewCompany}>
                <Plus size={16} /> Add New Company
              </button>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Firm Name</th>
                    <th>Max Funding</th>
                    <th>Profit Split</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Discount Code</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={company.logo} alt={company.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div>
                            <strong style={{ color: '#fff' }}>{company.name}</strong>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{company.platform}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--gold-light)', fontWeight: '700' }}>{company.max_funding}</td>
                      <td>{company.profit_split}</td>
                      <td style={{ color: '#4ade80', fontWeight: '700' }}>{company.start_price}</td>
                      <td>⭐ {company.rating}</td>
                      <td>
                        <span className="code-text" style={{ fontSize: '0.85rem' }}>{company.discount_code}</span>
                      </td>
                      <td>
                        {company.featured === 1 ? (
                          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Featured</span>
                        ) : (
                          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Standard</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-outline btn-sm" style={{ padding: '6px' }} onClick={() => handleOpenEditCompany(company)}>
                            <Edit3 size={14} />
                          </button>
                          <button className="btn btn-outline btn-sm" style={{ padding: '6px', color: '#f87171' }} onClick={() => handleDeleteCompany(company.id, company.name)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Giveaway Entries */}
        {activeTab === 'giveaways' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ position: 'relative', width: '300px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Search participants by name, email, handle..."
                  value={giveawaySearch}
                  onChange={(e) => setGiveawaySearch(e.target.value)}
                  style={{ paddingLeft: '38px', padding: '10px 14px', fontSize: '0.85rem' }}
                />
              </div>

              <button className="btn btn-gold btn-sm" onClick={handleExportCSV}>
                <Download size={16} /> Export Entries to CSV
              </button>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Entry ID</th>
                    <th>Participant Name</th>
                    <th>YouTube Handle</th>
                    <th>Email Address</th>
                    <th>Consent</th>
                    <th>Status</th>
                    <th>Submitted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGiveaways.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No giveaway participant entries found.
                      </td>
                    </tr>
                  ) : (
                    filteredGiveaways.map((entry) => (
                      <tr key={entry.id}>
                        <td style={{ color: 'var(--gold-light)', fontWeight: '700' }}>#{entry.id}</td>
                        <td>
                          <strong style={{ color: '#fff' }}>{entry.first_name} {entry.last_name}</strong>
                        </td>
                        <td style={{ color: '#ff4d4d', fontWeight: '600' }}>{entry.youtube_username}</td>
                        <td>{entry.email}</td>
                        <td>
                          {entry.consent ? (
                            <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>Agreed</span>
                          ) : (
                            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Pending</span>
                          )}
                        </td>
                        <td>
                          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                            {entry.status || 'Verified'}
                          </span>
                        </td>
                        <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                          {entry.created_at}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Add / Edit Company */}
      {showCompanyModal && (
        <div className="modal-overlay" onClick={() => setShowCompanyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <button className="modal-close" onClick={() => setShowCompanyModal(false)}>
              <X size={24} />
            </button>

            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
              {editingCompany ? 'Edit Company Information' : 'Add New Prop Firm'}
            </h2>

            <form onSubmit={handleSaveCompany}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={companyForm.name} 
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Logo Image URL *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={companyForm.logo} 
                    onChange={(e) => setCompanyForm({ ...companyForm, logo: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea 
                  className="form-textarea" 
                  rows="3" 
                  value={companyForm.description} 
                  onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Max Funding</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={companyForm.max_funding} 
                    onChange={(e) => setCompanyForm({ ...companyForm, max_funding: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Profit Split</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={companyForm.profit_split} 
                    onChange={(e) => setCompanyForm({ ...companyForm, profit_split: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Starting Price</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={companyForm.start_price} 
                    onChange={(e) => setCompanyForm({ ...companyForm, start_price: e.target.value })} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Discount Code</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={companyForm.discount_code} 
                    onChange={(e) => setCompanyForm({ ...companyForm, discount_code: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Discount Text</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={companyForm.discount_percentage} 
                    onChange={(e) => setCompanyForm({ ...companyForm, discount_percentage: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Rating (1-5)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="form-input" 
                    value={companyForm.rating} 
                    onChange={(e) => setCompanyForm({ ...companyForm, rating: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Referral / Offer URL</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={companyForm.referral_url} 
                  onChange={(e) => setCompanyForm({ ...companyForm, referral_url: e.target.value })} 
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', margin: '16px 0' }}>
                <label className="checkbox-group">
                  <input 
                    type="checkbox" 
                    checked={companyForm.featured === 1} 
                    onChange={(e) => setCompanyForm({ ...companyForm, featured: e.target.checked ? 1 : 0 })} 
                  />
                  <span>Mark as Featured Firm</span>
                </label>

                <label className="checkbox-group">
                  <input 
                    type="checkbox" 
                    checked={companyForm.top_deal === 1} 
                    onChange={(e) => setCompanyForm({ ...companyForm, top_deal: e.target.checked ? 1 : 0 })} 
                  />
                  <span>Show under Today's Biggest Deals</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowCompanyModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  Save Firm Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

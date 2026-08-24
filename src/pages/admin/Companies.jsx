import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, ArrowLeft, Upload, CheckCircle2, X, Building, Search } from 'lucide-react';
import { companyService } from '../../services/api';
import { Loading } from '../../components/Loading';

export function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [notification, setNotification] = useState('');

  const [form, setForm] = useState({
    company_name: '',
    slug: '',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200',
    short_description: '',
    full_description: '',
    website_url: 'https://',
    discount: '10% OFF',
    promo_code: 'SGA',
    deal_url: 'https://',
    featured: 0,
    status: 'active',
    max_funding: '$200,000',
    profit_split: '90/10',
    start_price: '$49',
    rating: 4.8,
    platform: 'MT4, MT5, cTrader'
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setLoading(true);
    const data = await companyService.getCompanies({ admin: true });
    setCompanies(data);
    setLoading(false);
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingCompany(null);
    setForm({
      company_name: '',
      slug: '',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200',
      short_description: '',
      full_description: '',
      website_url: 'https://',
      discount: '10% OFF',
      promo_code: 'SGA',
      deal_url: 'https://',
      featured: 0,
      status: 'active',
      max_funding: '$200,000',
      profit_split: '90/10',
      start_price: '$49',
      rating: 4.8,
      platform: 'MT4, MT5, cTrader'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (comp) => {
    setEditingCompany(comp);
    setForm({ ...comp });
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await companyService.uploadLogo(file);
      if (res.file_url) {
        setForm((prev) => ({ ...prev, logo: res.file_url }));
        showToast('Logo file uploaded successfully!');
      }
    } catch (err) {
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCompany) {
      await companyService.updateCompany({ ...form, id: editingCompany.id });
      showToast(`Updated company "${form.company_name}"`);
    } else {
      await companyService.createCompany(form);
      showToast(`Added new company "${form.company_name}"`);
    }
    setShowModal(false);
    loadCompanies();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await companyService.deleteCompany(id);
      showToast(`Deleted ${name}`);
      loadCompanies();
    }
  };

  const filtered = companies.filter(c => 
    c.company_name.toLowerCase().includes(search.toLowerCase()) ||
    c.short_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Link to="/admin/dashboard" className="btn btn-outline btn-sm" style={{ marginBottom: '12px' }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '2rem' }}>Company Management</h1>
          </div>

          <button className="btn btn-gold btn-sm" onClick={handleOpenAdd}>
            <Plus size={16} /> Add New Company
          </button>
        </div>

        {notification && (
          <div style={{ background: '#d1fae5', border: '1px solid #a7f3d0', color: '#065f46', padding: '14px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={18} /> {notification}
          </div>
        )}

        {/* Search */}
        <div style={{ marginBottom: '20px', position: 'relative', maxWidth: '360px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search companies..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '38px', padding: '10px 14px', fontSize: '0.85rem' }}
          />
        </div>

        {/* Table */}
        {loading ? (
          <Loading message="Loading company catalog..." />
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Slug</th>
                  <th>Discount</th>
                  <th>Promo Code</th>
                  <th>Featured</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((comp) => (
                  <tr key={comp.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={comp.logo} alt={comp.company_name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                        <strong style={{ color: 'var(--text-main)' }}>{comp.company_name}</strong>
                      </div>
                    </td>
                    <td className="text-muted" style={{ fontSize: '0.85rem' }}>{comp.slug}</td>
                    <td style={{ color: '#b89628', fontWeight: '700' }}>{comp.discount}</td>
                    <td><span className="code-text" style={{ fontSize: '0.85rem' }}>{comp.promo_code}</span></td>
                    <td>
                      {comp.featured === 1 ? (
                        <span className="badge badge-gold">Featured</span>
                      ) : (
                        <span className="badge badge-navy">Standard</span>
                      )}
                    </td>
                    <td>
                      {comp.status === 'active' ? (
                        <span className="badge badge-green">Active</span>
                      ) : (
                        <span className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>Inactive</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-outline btn-sm" style={{ padding: '6px' }} onClick={() => handleOpenEdit(comp)}>
                          <Edit3 size={14} />
                        </button>
                        <button className="btn btn-outline btn-sm" style={{ padding: '6px', color: '#dc2626' }} onClick={() => handleDelete(comp.id, comp.company_name)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Modal: Add / Edit Company */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
              {editingCompany ? 'Edit Company Information' : 'Add New Prop Firm'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">URL Slug</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. fundednext"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
              </div>

              {/* Logo File Upload or URL */}
              <div className="form-group">
                <label className="form-label">Company Logo (Upload File or Image URL) *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                    required
                  />
                  <label className="btn btn-outline" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload File'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description *</label>
                <textarea 
                  className="form-textarea" 
                  rows="2"
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Description (Detail Page) *</label>
                <textarea 
                  className="form-textarea" 
                  rows="4"
                  value={form.full_description}
                  onChange={(e) => setForm({ ...form, full_description: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Discount Text</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Promo Code</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.promo_code}
                    onChange={(e) => setForm({ ...form, promo_code: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-select"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Website URL</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.website_url}
                    onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deal CTA URL</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={form.deal_url}
                    onChange={(e) => setForm({ ...form, deal_url: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', margin: '16px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    checked={form.featured === 1}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked ? 1 : 0 })}
                    style={{ accentColor: 'var(--navy-accent)' }}
                  />
                  <span>Mark as Featured Company</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-navy">
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

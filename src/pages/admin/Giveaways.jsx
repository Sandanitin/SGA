import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Search, Trash2, ArrowLeft, Users, RefreshCw } from 'lucide-react';
import { giveawayService } from '../../services/api';
import { Loading } from '../../components/Loading';

export function Giveaways() {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadGiveaways();
  }, []);

  const loadGiveaways = async () => {
    setLoading(true);
    const data = await giveawayService.getGiveaways();
    setGiveaways(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this giveaway entry?')) {
      await giveawayService.deleteGiveaway(id);
      loadGiveaways();
    }
  };

  const handleExportCSV = () => {
    if (giveaways.length === 0) return;

    // Trigger direct backend API download if running with PHP or client download fallback
    window.open('/api/giveaways/export.php', '_blank');

    const headers = ['ID', 'First Name', 'Last Name', 'YouTube Username', 'Email', 'Consent', 'Submission Date'];
    const rows = giveaways.map(g => [
      g.id,
      `"${g.first_name}"`,
      `"${g.last_name}"`,
      `"${g.youtube_username}"`,
      `"${g.email}"`,
      g.consent ? 'Yes' : 'No',
      `"${g.created_at}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `onlypropfirms_giveaways_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = giveaways.filter(g => 
    g.first_name.toLowerCase().includes(search.toLowerCase()) ||
    g.last_name.toLowerCase().includes(search.toLowerCase()) ||
    g.email.toLowerCase().includes(search.toLowerCase()) ||
    g.youtube_username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Link to="/admin/dashboard" className="btn btn-outline btn-sm" style={{ marginBottom: '12px' }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '2rem' }}>Giveaway Participants Management</h1>
          </div>

          <button className="btn btn-gold btn-sm" onClick={handleExportCSV}>
            <Download size={16} /> Export CSV File
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px', position: 'relative', maxWidth: '380px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search participants by name, email, YouTube..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '38px', padding: '10px 14px', fontSize: '0.85rem' }}
          />
        </div>

        {/* Table */}
        {loading ? (
          <Loading message="Loading giveaway entries..." />
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>YouTube Username</th>
                  <th>Email Address</th>
                  <th>Consent</th>
                  <th>Submission Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                      No giveaway entries found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((g) => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: '700', color: 'var(--navy-accent)' }}>#{g.id}</td>
                      <td><strong style={{ color: 'var(--text-main)' }}>{g.first_name}</strong></td>
                      <td><strong style={{ color: 'var(--text-main)' }}>{g.last_name}</strong></td>
                      <td style={{ color: '#dc2626', fontWeight: '600' }}>{g.youtube_username}</td>
                      <td>{g.email}</td>
                      <td>
                        {g.consent ? (
                          <span className="badge badge-green">Agreed</span>
                        ) : (
                          <span className="badge badge-navy">Pending</span>
                        )}
                      </td>
                      <td className="text-muted" style={{ fontSize: '0.85rem' }}>{g.created_at}</td>
                      <td>
                        <button className="btn btn-outline btn-sm" style={{ padding: '6px', color: '#dc2626' }} onClick={() => handleDelete(g.id)}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

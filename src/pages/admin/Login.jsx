import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, UserCheck } from 'lucide-react';
import { authService } from '../../services/api';

export function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login(username, password);
      sessionStorage.setItem('opf_admin_token', res.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrator login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '20px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '440px', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img src="/logo.png" alt="SGA / OnlyPropFirms" style={{ height: '48px', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.6rem' }}>Admin Portal Login</h2>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            Secure management dashboard for OnlyPropFirms.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', color: '#991b1b', fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username / Email</label>
            <input 
              type="text" 
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-navy" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', background: '#fefce8', border: '1px border-color', borderRadius: '8px', fontSize: '0.8rem', color: '#854d0e', textAlign: 'center' }}>
          Demo Credentials: Username: <strong>admin</strong> | Password: <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}

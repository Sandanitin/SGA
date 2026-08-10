import React from 'react';
import { RefreshCw } from 'lucide-react';

export function Loading({ message = "Loading content..." }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
      <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '12px', color: 'var(--navy-accent)' }} />
      <p style={{ fontWeight: '500' }}>{message}</p>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

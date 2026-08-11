import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gift, Shield, BarChart2, Mail, UserCheck } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/prop-firms', label: 'Prop Firms' },
    { path: '/giveaways', label: 'Giveaways', highlight: true },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand Logo */}
        <Link to="/" className="logo-container" onClick={() => setMobileOpen(false)}>
          <img 
            src="/logo.png" 
            alt="OnlyPropFirms / SGA Academy" 
            className="logo-img"
          />
        </Link>

        {/* Desktop & Mobile Navigation */}
        <nav className={`nav-menu-container ${mobileOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-menu">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    {item.highlight && (
                      <span className="badge badge-gold" style={{ marginLeft: '6px' }}>
                        HOT
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/giveaways" className="btn btn-gold btn-sm giveaway-header-btn">
            <Gift size={16} /> Win $100K Account
          </Link>
          <Link to="/admin/login" className="btn btn-outline btn-sm admin-header-btn" title="Admin Login">
            <UserCheck size={16} /> Admin
          </Link>

          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

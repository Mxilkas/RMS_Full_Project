import {
  BarChart3,
  Building,
  Building2,
  ChevronDown,
  CreditCard,
  KeyRound,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import BrandLogo from './BrandLogo.jsx';

const allOperations = [
  { label: 'Overview', to: '/management', icon: BarChart3, roles: ['Admin', 'Manager', 'User'] },
  { label: 'Properties', to: '/properties', icon: Building2, roles: ['Admin', 'Manager'] },
  { label: 'Apartments', to: '/apartments', icon: Building, roles: ['Admin', 'Manager', 'User'] },
  { label: 'Owners', to: '/owners', icon: UsersRound, roles: ['Admin', 'Manager'] },
  { label: 'Customers', to: '/customers', icon: UserRound, roles: ['Admin', 'Manager'] },
  { label: 'Rentals', to: '/rentals', icon: KeyRound, roles: ['Admin', 'Manager'] },
  { label: 'Sales', to: '/sales', icon: ShoppingBag, roles: ['Admin', 'Manager'] },
  { label: 'Payments', to: '/payments', icon: CreditCard, roles: ['Admin', 'Manager', 'User'] },
  { label: 'Reports', to: '/reports', icon: BarChart3, roles: ['Admin', 'Manager'] },
  { label: 'System Users', to: '/users', icon: ShieldCheck, roles: ['Admin'] },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const role = session?.role || 'Guest';
  const visibleOperations = session
    ? allOperations.filter((item) => item.roles.includes(role))
    : allOperations.filter((item) => item.to === '/apartments');

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setManagementOpen(false);
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  function closeMenus() {
    setMobileOpen(false);
    setManagementOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenus();
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <BrandLogo />

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenus}>Home</NavLink>

          <div className="management-menu" ref={menuRef}>
            <button
              className="management-trigger"
              type="button"
              onClick={() => setManagementOpen((open) => !open)}
              aria-expanded={managementOpen}
            >
              Management Works <ChevronDown size={17} />
            </button>

            {managementOpen && (
              <div className="management-dropdown">
                <div className="dropdown-heading">
                  <strong>Management workspace</strong>
                  <small>Open a live API-connected module</small>
                </div>
                <div className="dropdown-grid">
                  {visibleOperations.map(({ label, to, icon: Icon }) => (
                    <NavLink key={to} to={to} onClick={closeMenus}>
                      <Icon size={18} />
                      <span>{label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/about" onClick={closeMenus}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenus}>Contact</NavLink>
        </nav>

        <div className="header-account">
          {session ? (
            <div className="account-panel">
              <span className="account-avatar">{session.username?.[0]?.toUpperCase() || 'U'}</span>
              <span className="account-copy">
                <strong>{session.username}</strong>
                <small>{session.role}</small>
              </span>
              <button className="icon-button" type="button" onClick={handleLogout} title="Log out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <NavLink className="button button-primary header-login" to="/login" onClick={closeMenus}>
              <LogIn size={17} /> Sign In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';

const PrimaryNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { label: 'Home', path: '/home-landing', icon: 'Home' },
    { label: 'Services', path: '/services-catalog', icon: 'Package' },
    { label: 'Coverage', path: '/coverage-map', icon: 'Map' },
    { label: 'About', path: '/about-us', icon: 'Info' },
    { label: 'Contact', path: '/contact-us', icon: 'Mail' },
    { label: 'Dashboard', path: '/customer-dashboard', icon: 'LayoutDashboard' },
  ];

  const isActivePath = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    signOut();
    closeMobileMenu();
    navigate('/home-landing');
  };

  return (
    <>
      {/* Mobile toggle */}
      <motion.button
        onClick={toggleMobileMenu}
        className="mobile-menu-toggle"
        aria-label="Toggle mobile menu"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
      </motion.button>

      {/* Desktop nav */}
      <motion.nav
        className="primary-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="primary-nav-container">
          <Link to="/home-landing" className="primary-nav-logo">
            <Icon name="Sparkles" size={20} color="var(--color-primary)" />
            <span>StyleDecor</span>
          </Link>

          <div className="primary-nav-menu">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`primary-nav-link ${isActivePath(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="primary-nav-actions flex items-center gap-3">
            <ThemeToggle />

            {!user ? (
              <Link to="/user-authentication">
                <Button variant="outline" size="sm" iconName="LogIn">
                  Login
                </Button>
              </Link>
            ) : (
              <>
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold uppercase">
                  {user?.name?.charAt(0) || 'U'}
                </div>

                {/* Username */}
                <span className="text-sm font-medium text-foreground">
                  {user?.name}
                </span>

                {/* Logout */}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="LogOut"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              onClick={closeMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <nav className="mobile-menu-nav">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="mobile-menu-link"
                  >
                    <Icon name={item.icon} size={18} />
                    {item.label}
                  </Link>
                ))}

                <div className="mt-4 border-t pt-4 space-y-3">
                  <ThemeToggle />

                  {!user ? (
                    <Link to="/user-authentication" onClick={closeMobileMenu}>
                      <Button variant="outline" fullWidth iconName="LogIn">
                        Login
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="LogOut"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrimaryNav;

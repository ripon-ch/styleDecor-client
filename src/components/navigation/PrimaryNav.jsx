import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

const PrimaryNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home-landing', icon: 'Home' },
    { label: 'Services', path: '/services-catalog', icon: 'Package' },
    { label: 'Coverage', path: '/coverage-map', icon: 'Map' },
    { label: 'About', path: '/about-us', icon: 'Info' },
    { label: 'Contact', path: '/contact-us', icon: 'Mail' },
    { label: 'Dashboard', path: '/customer-dashboard', icon: 'LayoutDashboard', requiresAuth: true },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={toggleMobileMenu}
        className="mobile-menu-toggle"
        aria-label="Toggle mobile menu"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
      </motion.button>
      <motion.nav 
        className="primary-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="primary-nav-container">
          <Link to="/home-landing" className="primary-nav-logo">
            <motion.div 
              className="primary-nav-logo-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon name="Sparkles" size={20} color="var(--color-primary)" />
            </motion.div>
            <span>StyleDecor</span>
          </Link>

          <div className="primary-nav-menu">
            {navigationItems?.map((item, index) => (
              <motion.div
                key={item?.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  to={item?.path}
                  className={`primary-nav-link ${isActivePath(item?.path) ? 'active' : ''}`}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item?.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="primary-nav-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <ThemeToggle />
            <Link to="/user-authentication">
              <Button variant="outline" size="sm" iconName="LogIn" iconPosition="left">
                Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              onClick={closeMobileMenu}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="mobile-menu"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-header">
                <div className="primary-nav-logo">
                  <div className="primary-nav-logo-icon">
                    <Icon name="Sparkles" size={20} color="var(--color-primary)" />
                  </div>
                  <span>StyleDecor</span>
                </div>
                <motion.button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close mobile menu"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon name="X" size={20} />
                </motion.button>
              </div>

              <nav className="mobile-menu-nav">
                {navigationItems?.map((item, index) => (
                  <motion.div
                    key={item?.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={item?.path}
                      onClick={closeMobileMenu}
                      className={`mobile-menu-link ${isActivePath(item?.path) ? 'active' : ''}`}
                    >
                      <motion.div 
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon name={item?.icon} size={20} />
                        <span>{item?.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  className="pt-4 mt-4 border-t border-border space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Link to="/user-authentication" onClick={closeMobileMenu}>
                    <Button variant="outline" fullWidth iconName="LogIn" iconPosition="left">
                      Login
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrimaryNav;
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import useTheme from '../../hooks/useTheme';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <Icon name="Sun" size={20} color="var(--color-warning)" />
        ) : (
          <Icon name="Moon" size={20} color="var(--color-primary)" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
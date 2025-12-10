import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinnerVariants = {
    start: {
      rotate: 0
    },
    end: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const dotVariants = {
    start: {
      scale: 0.5,
      opacity: 0.5
    },
    end: {
      scale: 1,
      opacity: 1
    }
  };

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1
      }
    },
    end: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
          <motion.div
            className={`${sizeClasses?.[size]} border-4 border-primary/30 border-t-primary rounded-full`}
            variants={spinnerVariants}
            initial="start"
            animate="end"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground font-medium"
          >
            {message}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className={`${sizeClasses?.[size]} border-4 border-primary/30 border-t-primary rounded-full`}
          variants={spinnerVariants}
          initial="start"
          animate="end"
        />
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export const DotsLoader = ({ size = 'md' }) => {
  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    end: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const dotVariants = {
    start: {
      y: 0
    },
    end: {
      y: -10,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-2"
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[0, 1, 2]?.map((index) => (
        <motion.div
          key={index}
          className={`${dotSize?.[size]} bg-primary rounded-full`}
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
};

export const PulseLoader = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses?.[size]} bg-primary rounded-full`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
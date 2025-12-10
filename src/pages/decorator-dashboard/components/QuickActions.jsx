import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      icon: 'Plus',
      title: 'New Service',
      description: 'Add a new service offering',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: 'MessageCircle',
      title: 'Messages',
      description: 'Check customer messages',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      badge: 5
    },
    {
      icon: 'Calendar',
      title: 'Schedule',
      description: 'Manage your calendar',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      icon: 'Upload',
      title: 'Upload Work',
      description: 'Add to portfolio',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action, index) => (
          <motion.button
            key={action?.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-lg ${action?.bgColor} ${action?.hoverColor} transition-all text-left group`}
          >
            {action?.badge && (
              <span className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {action?.badge}
              </span>
            )}
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center ${action?.color} group-hover:scale-110 transition-transform`}>
                <Icon name={action?.icon} size={20} />
              </div>
            </div>
            <h4 className="font-semibold text-foreground mb-1">{action?.title}</h4>
            <p className="text-xs text-muted-foreground">{action?.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
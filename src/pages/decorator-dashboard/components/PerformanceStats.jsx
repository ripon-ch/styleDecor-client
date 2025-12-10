import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PerformanceStats = ({ stats }) => {
  const statCards = [
    {
      title: "Active Bookings",
      value: stats?.activeBookings,
      icon: "Calendar",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+2 this week"
    },
    {
      title: "Completed Jobs",
      value: stats?.completedJobs,
      icon: "CheckCircle",
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: `${stats?.monthlyGrowth}% growth`
    },
    {
      title: "Total Earnings",
      value: `৳${(stats?.totalEarnings / 1000)?.toFixed(0)}K`,
      icon: "TrendingUp",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "This month"
    },
    {
      title: "Average Rating",
      value: stats?.averageRating,
      icon: "Star",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      trend: "From 156 reviews"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards?.map((stat, index) => (
        <motion.div
          key={stat?.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={stat?.color?.replace('text-', '')} />
            </div>
            <span className="text-xs text-success font-medium">{stat?.trend}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat?.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PerformanceStats;
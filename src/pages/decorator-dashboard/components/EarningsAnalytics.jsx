import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import Icon from '../../../components/AppIcon';

const EarningsAnalytics = ({ earningsData }) => {
  const [chartView, setChartView] = useState('revenue');

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              {entry?.name}: <span className="font-semibold text-primary">৳{entry?.value?.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalRevenue = earningsData?.monthlyRevenue?.reduce((sum, item) => sum + item?.revenue, 0);
  const totalBookings = earningsData?.monthlyRevenue?.reduce((sum, item) => sum + item?.bookings, 0);
  const avgMonthlyRevenue = Math.round(totalRevenue / earningsData?.monthlyRevenue?.length);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Earnings Analytics</h2>
        <p className="text-sm text-muted-foreground">Track your revenue and business growth</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-sm font-medium opacity-90">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold">৳{(totalRevenue / 1000)?.toFixed(0)}K</p>
          <p className="text-xs opacity-75 mt-1">Last 12 months</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <span className="text-sm font-medium opacity-90">Total Bookings</span>
          </div>
          <p className="text-3xl font-bold">{totalBookings}</p>
          <p className="text-xs opacity-75 mt-1">Completed this year</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} color="white" />
            </div>
            <span className="text-sm font-medium opacity-90">Avg Monthly</span>
          </div>
          <p className="text-3xl font-bold">৳{(avgMonthlyRevenue / 1000)?.toFixed(0)}K</p>
          <p className="text-xs opacity-75 mt-1">Average per month</p>
        </motion.div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Revenue Trends</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartView('revenue')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartView === 'revenue' ?'bg-primary text-white' :'bg-muted text-foreground hover:bg-muted/70'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setChartView('bookings')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartView === 'bookings' ?'bg-primary text-white' :'bg-muted text-foreground hover:bg-muted/70'
              }`}
            >
              Bookings
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'revenue' ? (
              <LineChart data={earningsData?.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `৳${(value / 1000)?.toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Revenue (৳)"
                  animationDuration={1500}
                />
              </LineChart>
            ) : (
              <BarChart data={earningsData?.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="bookings" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]}
                  name="Bookings"
                  animationDuration={1500}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Service Revenue Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={earningsData?.serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                >
                  {earningsData?.serviceBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {earningsData?.serviceBreakdown?.map((service, index) => (
              <div key={service?.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS?.[index] }}></div>
                <div>
                  <p className="text-xs text-muted-foreground">{service?.name}</p>
                  <p className="text-sm font-semibold text-foreground">৳{(service?.revenue / 1000)?.toFixed(0)}K</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {earningsData?.recentTransactions?.map((transaction) => (
              <motion.div
                key={transaction?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction?.status === 'Received' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Icon 
                      name={transaction?.status === 'Received' ? 'CheckCircle' : 'Clock'} 
                      size={18} 
                      color={transaction?.status === 'Received' ? 'green' : 'orange'}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{transaction?.customerName}</p>
                    <p className="text-xs text-muted-foreground">{transaction?.service}</p>
                    <p className="text-xs text-muted-foreground">{transaction?.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">৳{transaction?.amount?.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    transaction?.status === 'Received' ?'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction?.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsAnalytics;
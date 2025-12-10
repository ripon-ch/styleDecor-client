import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatisticsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: 'Users',
      label: 'Total Decorators',
      value: 200,
      suffix: '+',
      color: 'text-primary'
    },
    {
      icon: 'CheckCircle',
      label: 'Completed Projects',
      value: 1000,
      suffix: '+',
      color: 'text-green-500'
    },
    {
      icon: 'Star',
      label: 'Customer Satisfaction',
      value: 98,
      suffix: '%',
      color: 'text-yellow-500'
    },
    {
      icon: 'MapPin',
      label: 'Coverage Areas',
      value: 64,
      suffix: ' Districts',
      color: 'text-blue-500'
    }
  ];

  const [counters, setCounters] = useState(stats?.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    stats?.forEach((stat, index) => {
      let current = 0;
      const increment = stat?.value / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat?.value) {
          current = stat?.value;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, interval);
    });
  }, [isInView]);

  return (
    <section className="py-16 lg:py-24 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Growing stronger every day with our community of decorators and customers
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((stat, index) => (
            <motion.div
              key={stat?.label}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Icon name={stat?.icon} size={32} className={stat?.color} />
              </div>
              <motion.div 
                className="text-4xl font-bold text-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                {counters?.[index]}{stat?.suffix}
              </motion.div>
              <p className="text-muted-foreground font-medium">{stat?.label}</p>
              
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${stat?.color?.replace('text-', 'bg-')}`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
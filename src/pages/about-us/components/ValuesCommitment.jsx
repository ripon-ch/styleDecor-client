import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ValuesCommitment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: 'Shield',
      title: 'Quality Assurance',
      description: 'Every decorator undergoes rigorous vetting and quality checks to ensure exceptional service standards.',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      icon: 'Heart',
      title: 'Customer First',
      description: '24/7 customer support, transparent pricing, and satisfaction guarantee on all decoration services.',
      color: 'bg-red-500/10 text-red-500'
    },
    {
      icon: 'Award',
      title: 'Professional Excellence',
      description: 'Continuous training and certification programs to maintain industry-leading decoration standards.',
      color: 'bg-yellow-500/10 text-yellow-500'
    },
    {
      icon: 'CheckCircle',
      title: 'Trust & Transparency',
      description: 'Clear communication, verified reviews, and fair practices in all customer and decorator interactions.',
      color: 'bg-green-500/10 text-green-500'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Our Values & Commitment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building trust through quality, transparency, and unwavering commitment to excellence
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values?.map((value, index) => (
            <motion.div
              key={value?.title}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-14 h-14 rounded-xl ${value?.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={value?.icon} size={28} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-3">
                {value?.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value?.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Target" size={40} className="text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-heading font-bold text-foreground text-2xl mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to professional decoration services across Bangladesh, empowering both customers and decorators through technology. We believe every celebration and space deserves expert attention, regardless of location or budget.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesCommitment;
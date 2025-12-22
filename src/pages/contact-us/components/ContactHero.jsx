import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.jsx';

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon name="MessageCircle" size={18} className="text-primary" />
            <span className="text-sm font-medium text-primary">We're Here to Help</span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Get in Touch with{' '}
            <span className="text-primary">StyleDecor</span>
          </motion.h1>

          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Have questions about our decoration services? Need help with a booking? Our dedicated support team is ready to assist you 24/7.
          </motion.p>

          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-green-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">24/7 Support</p>
                <p className="text-xs text-muted-foreground">Always Available</p>
              </div>
            </div>

            <div className="w-px h-12 bg-border hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Fast Response</p>
                <p className="text-xs text-muted-foreground">Within 2 Hours</p>
              </div>
            </div>

            <div className="w-px h-12 bg-border hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-purple-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Secure</p>
                <p className="text-xs text-muted-foreground">Data Protected</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
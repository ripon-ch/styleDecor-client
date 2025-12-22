import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const ContactMethods = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      details: '+880 1234-567890',
      action: 'Call Now',
      color: 'bg-green-500/10 text-green-500',
      onClick: () => window.location.href = 'tel:+8801234567890'
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      description: 'Send us detailed inquiries',
      details: 'support@styledecor.com',
      action: 'Send Email',
      color: 'bg-blue-500/10 text-blue-500',
      onClick: () => window.location.href = 'mailto:support@styledecor.com'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Get instant help from our team',
      details: 'Available 24/7',
      action: 'Start Chat',
      color: 'bg-purple-500/10 text-purple-500',
      onClick: () => alert('Live chat feature coming soon!')
    },
    {
      icon: 'MapPin',
      title: 'Visit Office',
      description: 'Meet us at our headquarters',
      details: 'Dhaka, Bangladesh',
      action: 'Get Directions',
      color: 'bg-red-500/10 text-red-500',
      onClick: () => alert('Opening Google Maps...')
    }
  ];

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
            Multiple Ways to Reach Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred communication channel and we'll respond promptly
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods?.map((method, index) => (
            <motion.div
              key={method?.title}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-14 h-14 rounded-xl ${method?.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={method?.icon} size={28} />
              </div>
              
              <h3 className="font-heading font-bold text-foreground text-lg mb-2">
                {method?.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {method?.description}
              </p>
              <p className="text-primary font-semibold text-sm mb-4">
                {method?.details}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={method?.onClick}
                className="group-hover:bg-primary group-hover:text-white transition-colors"
              >
                {method?.action}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-xl p-6 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-heading font-bold text-foreground text-xl mb-2">
                Business Hours
              </h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 8:00 PM • Saturday: 10:00 AM - 6:00 PM • Sunday: 10:00 AM - 4:00 PM
              </p>
              <p className="text-sm text-primary mt-2">Emergency support available 24/7</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMethods;
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const OfficeLocations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const locations = [
    {
      city: 'Dhaka',
      type: 'Headquarters',
      address: 'House 45, Road 12, Dhanmondi, Dhaka 1209',
      phone: '+880 1234-567890',
      email: 'dhaka@styledecor.com',
      hours: 'Mon-Sat: 9AM-8PM',
      icon: 'Building2',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      city: 'Chittagong',
      type: 'Regional Office',
      address: 'CDA Avenue, Nasirabad, Chittagong 4000',
      phone: '+880 1234-567891',
      email: 'chittagong@styledecor.com',
      hours: 'Mon-Sat: 10AM-7PM',
      icon: 'Building',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      city: 'Sylhet',
      type: 'Branch Office',
      address: 'Zindabazar, Sylhet 3100',
      phone: '+880 1234-567892',
      email: 'sylhet@styledecor.com',
      hours: 'Mon-Sat: 10AM-6PM',
      icon: 'Home',
      color: 'bg-purple-500/10 text-purple-500'
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
            Our Office Locations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us at any of our offices across Bangladesh
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {locations?.map((location, index) => (
            <motion.div
              key={location?.city}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg ${location?.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={location?.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-xl">
                    {location?.city}
                  </h3>
                  <span className="text-sm text-primary font-medium">{location?.type}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{location?.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={18} className="text-muted-foreground flex-shrink-0" />
                  <a href={`tel:${location?.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {location?.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={18} className="text-muted-foreground flex-shrink-0" />
                  <a href={`mailto:${location?.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {location?.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={18} className="text-muted-foreground flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{location?.hours}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Navigation"
                iconPosition="left"
                onClick={() => alert(`Opening directions to ${location?.city}...`)}
              >
                Get Directions
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-card border border-border rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="aspect-[21/9] bg-muted relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Icon name="Map" size={64} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfficeLocations;
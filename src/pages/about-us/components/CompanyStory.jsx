import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Icon from '../../../components/AppIcon.jsx';

const CompanyStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'StyleDecor was founded with a vision to revolutionize decoration services in Bangladesh.',
      icon: 'Rocket'
    },
    {
      year: '2021',
      title: 'Expansion',
      description: 'Expanded to 30 districts, onboarding 100+ professional decorators.',
      icon: 'TrendingUp'
    },
    {
      year: '2022',
      title: 'Recognition',
      description: 'Received "Best Service Platform" award and reached 500+ happy customers.',
      icon: 'Award'
    },
    {
      year: '2023',
      title: 'Nationwide',
      description: 'Achieved full coverage across all 64 districts with 200+ decorators.',
      icon: 'MapPin'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From humble beginnings to becoming Bangladesh's premier decoration service platform
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden lg:block"></div>
          
          <div className="space-y-12">
            {timeline?.map((item, index) => (
              <motion.div
                key={item?.year}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex-1 lg:text-right lg:pr-8">
                  <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                      {item?.year}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      {item?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item?.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center">
                    <Icon name={item?.icon} size={24} className="text-primary" />
                  </div>
                </div>

                <div className="flex-1 lg:pl-8">
                  {/* Empty space for alternating layout */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
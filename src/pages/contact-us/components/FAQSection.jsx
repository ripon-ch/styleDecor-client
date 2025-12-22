import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon.jsx';

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I book a decoration service?',
      answer: 'Simply browse our services catalog, select your preferred decorator, choose your date and time, and complete the booking through our secure payment system. You\'ll receive instant confirmation via email and SMS.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'You can cancel bookings up to 48 hours before the scheduled service for a full refund. Cancellations within 24-48 hours receive 50% refund. Same-day cancellations are non-refundable but can be rescheduled once.'
    },
    {
      question: 'Are your decorators verified and insured?',
      answer: 'Yes, all decorators undergo thorough background checks, skill verification, and carry professional liability insurance. We only work with certified professionals who meet our quality standards.'
    },
    {
      question: 'What areas do you cover in Bangladesh?',
      answer: 'We provide services across all 64 districts of Bangladesh. Coverage may vary by decorator availability in specific thanas. Check our coverage map for detailed area information.'
    },
    {
      question: 'How do I become a decorator on StyleDecor?',
      answer: 'Apply through our decorator registration page with your portfolio, credentials, and references. Our team will review your application within 3-5 business days and guide you through the onboarding process.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, mobile banking (bKash, Nagad, Rocket), and bank transfers. All payments are processed through secure, encrypted channels for your safety.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Quick answers to common questions about our services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <span className="font-heading font-semibold text-foreground text-lg pr-8 group-hover:text-primary transition-colors">
                  {faq?.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Icon 
                    name="ChevronDown" 
                    size={24} 
                    className={`${openIndex === index ? 'text-primary' : 'text-muted-foreground'} transition-colors`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq?.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Icon name="HelpCircle" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="font-heading font-bold text-foreground text-xl mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help with any additional inquiries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+8801234567890" className="text-primary hover:underline font-medium">
              Call: +880 1234-567890
            </a>
            <span className="text-border">•</span>
            <a href="mailto:support@styledecor.com" className="text-primary hover:underline font-medium">
              Email: support@styledecor.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
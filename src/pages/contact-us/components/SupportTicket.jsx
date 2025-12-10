import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Swal from 'sweetalert2';

const SupportTicket = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [ticketNumber, setTicketNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleTicketSearch = async () => {
    if (!ticketNumber?.trim()) {
      Swal?.fire({
        icon: 'warning',
        title: 'Ticket Number Required',
        text: 'Please enter a valid ticket number to track your support request.',
        confirmButtonColor: 'var(--color-primary)'
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSearching(false);

    Swal?.fire({
      icon: 'info',
      title: 'Ticket Status',
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Ticket #:</strong> ${ticketNumber}</p>
          <p class="mb-2"><strong>Status:</strong> <span class="text-green-500">In Progress</span></p>
          <p class="mb-2"><strong>Created:</strong> Dec 8, 2025</p>
          <p class="mb-2"><strong>Last Update:</strong> 2 hours ago</p>
          <p class="mt-4">Our team is actively working on your request. Expected resolution: Within 24 hours.</p>
        </div>
      `,
      confirmButtonColor: 'var(--color-primary)',
      confirmButtonText: 'Got it!'
    });
  };

  const generateTicket = () => {
    const newTicket = `SD${Date.now()?.toString()?.slice(-8)}`;
    
    Swal?.fire({
      icon: 'success',
      title: 'Support Ticket Created',
      html: `
        <div class="text-left">
          <p class="mb-3">Your support ticket has been generated:</p>
          <div class="bg-gray-100 p-4 rounded-lg mb-3">
            <p class="text-2xl font-bold text-center">${newTicket}</p>
          </div>
          <p class="text-sm text-gray-600">Save this number to track your request. You'll also receive it via email.</p>
        </div>
      `,
      confirmButtonColor: 'var(--color-primary)',
      confirmButtonText: 'Close'
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Support Ticket System
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your support requests or create a new ticket for priority assistance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-card border border-border rounded-xl p-6 lg:p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Icon name="Search" size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-xl">
                  Track Your Ticket
                </h3>
                <p className="text-sm text-muted-foreground">Enter your ticket number</p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Enter ticket number (e.g., SD12345678)"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e?.target?.value)}
                className="text-center font-mono"
              />
              
              <Button
                variant="default"
                size="lg"
                fullWidth
                onClick={handleTicketSearch}
                disabled={isSearching}
                iconName={isSearching ? undefined : "Search"}
                iconPosition="left"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  'Track Ticket'
                )}
              </Button>
            </div>

            <div className="mt-6 bg-muted/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Check your email for the ticket number sent when you created your support request.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-xl p-6 lg:p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Icon name="Plus" size={24} className="text-green-500" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-xl">
                  Create New Ticket
                </h3>
                <p className="text-sm text-muted-foreground">Get priority support</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Clock" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Fast Response</p>
                  <p className="text-xs text-muted-foreground">Avg. 2-4 hour response time</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Users" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Dedicated Team</p>
                  <p className="text-xs text-muted-foreground">Expert support staff assigned</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="Bell" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Updates</p>
                  <p className="text-xs text-muted-foreground">Automatic status notifications</p>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={generateTicket}
              iconName="Ticket"
              iconPosition="left"
            >
              Generate Support Ticket
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 bg-card border border-border rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h4 className="font-heading font-bold text-foreground mb-4">
            Emergency Support
          </h4>
          <p className="text-muted-foreground mb-4">
            For urgent issues requiring immediate attention, contact our 24/7 emergency hotline:
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+8801234567899"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors font-medium"
            >
              <Icon name="Phone" size={20} />
              <span>+880 1234-567899</span>
            </a>
            <span className="text-sm text-muted-foreground">
              Available for booking emergencies, payment issues, and urgent service requests
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportTicket;
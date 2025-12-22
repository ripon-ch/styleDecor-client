import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    services: [
      { label: "Wedding Decoration", path: "/services-catalog" },
      { label: "Home Interior", path: "/services-catalog" },
      { label: "Corporate Events", path: "/services-catalog" },
      { label: "Birthday Parties", path: "/services-catalog" }
    ],
    company: [
      { label: "About Us", path: "/home-landing" },
      { label: "Our Decorators", path: "/services-catalog" },
      { label: "Coverage Areas", path: "/home-landing" },
      { label: "Testimonials", path: "/home-landing" }
    ],
    support: [
      { label: "Help Center", path: "/home-landing" },
      { label: "Contact Us", path: "/home-landing" },
      { label: "Privacy Policy", path: "/home-landing" },
      { label: "Terms of Service", path: "/home-landing" }
    ]
  };

  const socialLinks = [
    { icon: "Facebook", url: "#", label: "Facebook" },
    { icon: "Instagram", url: "#", label: "Instagram" },
    { icon: "Twitter", url: "#", label: "Twitter" },
    { icon: "Linkedin", url: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/home-landing" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Sparkles" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">StyleDecor</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Bangladesh's premier decoration service platform connecting clients with professional decorators for homes, ceremonies, and special events.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                >
                  <Icon
                    name={social?.icon}
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks?.services?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} StyleDecor. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/home-landing" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/home-landing" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/home-landing" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
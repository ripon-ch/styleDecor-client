import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      icon: "Award",
      title: "ISO Certified",
      description: "Quality management standards"
    },
    {
      id: 2,
      icon: "Shield",
      title: "Insured Services",
      description: "Full liability coverage"
    },
    {
      id: 3,
      icon: "CheckCircle",
      title: "Verified Professionals",
      description: "Background checked decorators"
    },
    {
      id: 4,
      icon: "Clock",
      title: "On-Time Guarantee",
      description: "Punctual service delivery"
    }
  ];

  const stats = [
    {
      id: 1,
      value: "500+",
      label: "Projects Completed",
      icon: "Briefcase"
    },
    {
      id: 2,
      value: "50+",
      label: "Expert Decorators",
      icon: "Users"
    },
    {
      id: 3,
      value: "64",
      label: "Districts Covered",
      icon: "MapPin"
    },
    {
      id: 4,
      value: "98%",
      label: "Client Satisfaction",
      icon: "Heart"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Why Choose StyleDecor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by hundreds of clients across Bangladesh for professional decoration services
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="card p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={cert?.icon} size={32} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {cert?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat) => (
              <div key={stat?.id} className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={stat?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-1">{stat?.value}</p>
                  <p className="text-sm text-muted-foreground">{stat?.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              </div>
              <h4 className="font-semibold text-foreground">Quality Assurance</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Every project undergoes rigorous quality checks to ensure excellence in execution and client satisfaction
            </p>
          </div>

          <div className="card p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Headphones" size={20} color="var(--color-primary)" />
              </div>
              <h4 className="font-semibold text-foreground">24/7 Support</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Our dedicated support team is available round the clock to assist you with any queries or concerns
            </p>
          </div>

          <div className="card p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon name="DollarSign" size={20} color="var(--color-accent)" />
              </div>
              <h4 className="font-semibold text-foreground">Best Price Guarantee</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Competitive pricing with transparent quotes and no hidden charges for all our decoration services
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
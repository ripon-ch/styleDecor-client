import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
  {
    icon: 'Shield',
    title: 'Secure Platform',
    description: 'Bank-level encryption protects your data'
  },
  {
    icon: 'Users',
    title: '10,000+ Users',
    description: 'Trusted by customers across Bangladesh'
  },
  {
    icon: 'Award',
    title: 'Verified Decorators',
    description: 'All professionals are background-checked'
  }];


  const testimonials = [
  {
    name: 'Fatima Rahman',
    location: 'Dhaka',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_148ae490a-1763296290036.png",
    avatarAlt: 'Professional headshot of Bangladeshi woman with long black hair wearing traditional red saree',
    rating: 5,
    text: 'StyleDecor made my wedding decoration seamless. The decorator was professional and the booking process was so easy!'
  },
  {
    name: 'Karim Ahmed',
    location: 'Chittagong',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dca446f8-1763296290297.png",
    avatarAlt: 'Professional headshot of Bangladeshi man with short black hair wearing white punjabi',
    rating: 5,
    text: 'Excellent service! They transformed my home for Eid. Highly recommend to everyone in Bangladesh.'
  }];


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustFeatures?.map((feature, index) =>
        <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{feature?.title}</h3>
            <p className="text-sm text-muted-foreground">{feature?.description}</p>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials?.map((testimonial, index) =>
          <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <img
                src={testimonial?.avatar}
                alt={testimonial?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover" />

                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial?.location}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) =>
                  <Icon key={i} name="Star" size={14} color="var(--color-warning)" className="fill-current" />
                  )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{testimonial?.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default TrustSignals;
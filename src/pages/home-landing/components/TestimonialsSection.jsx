import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
  {
    id: 1,
    name: "Ayesha Siddiqua",
    role: "Wedding Client",
    image: "https://images.unsplash.com/photo-1645856047759-3fbbf344ff43",
    imageAlt: "Happy Bangladeshi bride with warm smile wearing traditional red wedding attire and elegant jewelry",
    rating: 5,
    comment: "StyleDecor made our wedding day absolutely magical! The decoration was beyond our expectations. Every detail was perfect, from the floral arrangements to the lighting. Highly recommended for anyone planning a special event.",
    location: "Dhaka",
    date: "November 2024"
  },
  {
    id: 2,
    name: "Mohammad Karim",
    role: "Home Interior Client",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbf5e530-1764829360262.png",
    imageAlt: "Satisfied Bangladeshi homeowner with confident expression wearing casual formal attire in modern home setting",
    rating: 5,
    comment: "The team transformed our living room completely. Their attention to detail and understanding of our preferences was impressive. The consultation process was smooth, and the final result exceeded our expectations.",
    location: "Chittagong",
    date: "October 2024"
  },
  {
    id: 3,
    name: "Tasnuva Haque",
    role: "Corporate Event Client",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1372eff95-1763298441800.png",
    imageAlt: "Professional Bangladeshi businesswoman with friendly demeanor wearing formal business suit in office environment",
    rating: 5,
    comment: "We hired StyleDecor for our company's annual conference. The professionalism and creativity they brought to the event was outstanding. Everything was executed flawlessly, and our guests were thoroughly impressed.",
    location: "Sylhet",
    date: "December 2024"
  },
  {
    id: 4,
    name: "Rafiq Ahmed",
    role: "Restaurant Owner",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d707559-1764675687973.png",
    imageAlt: "Successful Bangladeshi restaurant owner with proud expression wearing chef\'s attire in decorated dining space",
    rating: 4,
    comment: "StyleDecor helped us redesign our restaurant interior. The new ambiance has significantly improved our customer experience. The team was professional, punctual, and delivered exactly what we envisioned.",
    location: "Rajshahi",
    date: "September 2024"
  }];


  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from satisfied clients across Bangladesh who trusted us with their special moments
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials?.map((testimonial) =>
          <div key={testimonial?.id} className="card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                  <Image
                  src={testimonial?.image}
                  alt={testimonial?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {testimonial?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial?.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)]?.map((_, idx) =>
              <Icon
                key={idx}
                name={idx < testimonial?.rating ? 'Star' : 'Star'}
                size={16}
                color={idx < testimonial?.rating ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                className={idx < testimonial?.rating ? 'fill-primary' : ''} />

              )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                "{testimonial?.comment}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={12} />
                  <span>{testimonial?.location}</span>
                </div>
                <span>{testimonial?.date}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 p-6 bg-card rounded-xl border border-border">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">4.8</p>
              <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;
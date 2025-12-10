import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesOverview = () => {
  const navigate = useNavigate();

  const services = [
  {
    id: 1,
    title: "Wedding Decoration",
    description: "Create unforgettable moments with our expert wedding decoration services including stage setup, floral arrangements, and lighting design",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_192368848-1764923909514.png",
    imageAlt: "Elegant wedding venue decorated with white drapes, golden lighting, floral centerpieces, and romantic ambiance for ceremony celebration",
    icon: "Heart",
    priceRange: "৳25,000 - ৳2,00,000",
    duration: "Full Day",
    popular: true
  },
  {
    id: 2,
    title: "Home Interior Design",
    description: "Transform your living spaces with professional interior design consultation, furniture arrangement, and decor selection",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14eb753f8-1764845698055.png",
    imageAlt: "Modern living room interior with comfortable grey sofa, wooden coffee table, indoor plants, and contemporary wall decorations",
    icon: "Home",
    priceRange: "৳15,000 - ৳1,50,000",
    duration: "2-5 Days",
    popular: true
  },
  {
    id: 3,
    title: "Birthday Party Setup",
    description: "Make birthdays special with themed decorations, balloon arrangements, cake table setup, and party props",
    image: "https://images.unsplash.com/photo-1613247415642-3f5797ee5777",
    imageAlt: "Colorful birthday party decoration with balloons, streamers, birthday cake table, and festive party supplies",
    icon: "Gift",
    priceRange: "৳5,000 - ৳50,000",
    duration: "Half Day",
    popular: false
  },
  {
    id: 4,
    title: "Corporate Event Design",
    description: "Professional event decoration for conferences, seminars, product launches, and corporate gatherings",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c75419f2-1764666356653.png",
    imageAlt: "Professional corporate event venue with stage setup, branded backdrop, modern lighting, and organized seating arrangement",
    icon: "Briefcase",
    priceRange: "৳30,000 - ৳3,00,000",
    duration: "Full Day",
    popular: false
  },
  {
    id: 5,
    title: "Festival Decoration",
    description: "Celebrate cultural festivals with traditional and contemporary decoration services for Eid, Durga Puja, and more",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13adda754-1764693661119.png",
    imageAlt: "Traditional festival decoration with colorful lights, cultural ornaments, festive drapes, and ceremonial setup",
    icon: "Sparkles",
    priceRange: "৳10,000 - ৳1,00,000",
    duration: "1-2 Days",
    popular: true
  },
  {
    id: 6,
    title: "Restaurant & Cafe Design",
    description: "Create inviting dining spaces with custom interior design, lighting solutions, and ambiance creation",
    image: "https://images.unsplash.com/photo-1562835155-1fa627c69744",
    imageAlt: "Stylish restaurant interior with wooden furniture, warm lighting, decorative plants, and cozy dining atmosphere",
    icon: "Coffee",
    priceRange: "৳40,000 - ৳5,00,000",
    duration: "1-2 Weeks",
    popular: false
  }];


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Our Decoration Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive decoration solutions for every occasion, from intimate gatherings to grand celebrations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) =>
          <div
            key={service?.id}
            className="card card-hover overflow-hidden group cursor-pointer"
            onClick={() => navigate('/service-details')}>

              <div className="relative h-48 overflow-hidden">
                <Image
                src={service?.image}
                alt={service?.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                {service?.popular &&
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Icon name="TrendingUp" size={12} />
                    Popular
                  </div>
              }
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-lg">
                    <Icon name={service?.icon} size={24} color="var(--color-primary)" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service?.description}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price Range:</span>
                    <span className="font-semibold text-primary">{service?.priceRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{service?.duration}</span>
                  </div>
                </div>

                <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right">

                  View Details
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="default"
            size="lg"
            iconName="Grid"
            iconPosition="left"
            onClick={() => navigate('/services-catalog')}>

            View All Services
          </Button>
        </div>
      </div>
    </section>);

};

export default ServicesOverview;
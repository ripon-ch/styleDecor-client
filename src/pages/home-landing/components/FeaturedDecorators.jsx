import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedDecorators = () => {
  const navigate = useNavigate();

  const decorators = [
  {
    id: 1,
    name: "Fatima Rahman",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10fb083fa-1763296324852.png",
    imageAlt: "Professional portrait of Bangladeshi woman decorator with warm smile wearing elegant traditional attire and modern accessories",
    specialization: "Wedding & Ceremony Decoration",
    rating: 4.9,
    reviews: 127,
    completedProjects: 156,
    location: "Dhaka, Bangladesh",
    experience: "8 years"
  },
  {
    id: 2,
    name: "Kamal Hossain",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d126af2f-1763293474375.png",
    imageAlt: "Professional headshot of Bangladeshi male decorator with confident expression wearing formal business attire and glasses",
    specialization: "Home Interior Design",
    rating: 4.8,
    reviews: 98,
    completedProjects: 134,
    location: "Chittagong, Bangladesh",
    experience: "6 years"
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10fb083fa-1763296324852.png",
    imageAlt: "Professional portrait of young Bangladeshi woman decorator with creative expression wearing contemporary outfit and artistic jewelry",
    specialization: "Event & Party Decoration",
    rating: 4.9,
    reviews: 142,
    completedProjects: 189,
    location: "Sylhet, Bangladesh",
    experience: "7 years"
  },
  {
    id: 4,
    name: "Rashid Ahmed",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc1f7163-1763293230065.png",
    imageAlt: "Professional headshot of experienced Bangladeshi male decorator with friendly demeanor wearing traditional formal wear",
    specialization: "Corporate & Office Design",
    rating: 4.7,
    reviews: 85,
    completedProjects: 112,
    location: "Rajshahi, Bangladesh",
    experience: "5 years"
  }];


  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Featured Decorators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our top-rated decoration professionals trusted by hundreds of satisfied clients across Bangladesh
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {decorators?.map((decorator) =>
          <div
            key={decorator?.id}
            className="card card-hover p-6 space-y-4">

              <div className="relative">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                  src={decorator?.image}
                  alt={decorator?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Icon name="Star" size={12} />
                  {decorator?.rating}
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {decorator?.name}
                </h3>
                <p className="text-sm text-primary font-medium">
                  {decorator?.specialization}
                </p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Icon name="MapPin" size={14} />
                  <span>{decorator?.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Icon name="Briefcase" size={14} />
                  <span>{decorator?.experience} experience</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Projects</p>
                  <p className="font-semibold text-foreground">{decorator?.completedProjects}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Reviews</p>
                  <p className="font-semibold text-foreground">{decorator?.reviews}</p>
                </div>
              </div>

              <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={() => navigate('/user-authentication')}>

                Book Now
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="default"
            size="lg"
            iconName="Users"
            iconPosition="left"
            onClick={() => navigate('/services-catalog')}>

            View All Decorators
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedDecorators;
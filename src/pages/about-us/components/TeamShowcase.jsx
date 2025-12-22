import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from '../../../components/AppImage.jsx';


const TeamShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
  {
    name: 'Rafiqul Islam',
    role: 'Founder & CEO',
    expertise: 'Business Strategy, Operations',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15f5df48e-1763301117720.png",
    alt: 'Professional portrait of Rafiqul Islam, StyleDecor founder, wearing business attire with confident expression'
  },
  {
    name: 'Fatema Ahmed',
    role: 'Head of Design',
    expertise: 'Interior Design, Visual Arts',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14492bc9f-1763296202780.png",
    alt: 'Professional portrait of Fatema Ahmed, head designer, reviewing design materials with creative workspace background'
  },
  {
    name: 'Karim Hassan',
    role: 'Operations Manager',
    expertise: 'Logistics, Decorator Network',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c66c46c-1763301780768.png",
    alt: 'Professional portrait of Karim Hassan, operations manager, in modern office setting with organized workspace'
  },
  {
    name: 'Nadia Rahman',
    role: 'Customer Success Lead',
    expertise: 'Customer Relations, Quality Assurance',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11d26b341-1763294431286.png",
    alt: 'Professional portrait of Nadia Rahman, customer success lead, with welcoming smile in professional environment'
  }];


  return (
    <section className="py-16 lg:py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate professionals dedicated to delivering excellence in decoration services
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers?.map((member, index) =>
          <motion.div
            key={member?.name}
            className="group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}>

              <div className="relative overflow-hidden rounded-2xl mb-4">
                <Image
                src={member?.image}
                alt={member?.alt}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm text-accent font-medium">{member?.expertise}</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-heading font-bold text-foreground text-lg mb-1">
                  {member?.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">{member?.role}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default TeamShowcase;
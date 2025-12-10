import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}>

              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-primary">Est. 2020</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}>

              Transforming Spaces,{' '}
              <span className="text-primary">Creating Memories</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}>

              StyleDecor is Bangladesh's leading decoration service platform, connecting customers with skilled decorators across the nation. Our mission is to make professional decoration services accessible, affordable, and exceptional.
            </motion.p>

            <motion.div
              className="flex items-center gap-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}>

              <div className="text-center">
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Projects Done</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">64</p>
                <p className="text-sm text-muted-foreground">Districts</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1f7069e4d-1764661633094.png"
                alt="Modern StyleDecor office interior with team members collaborating on decoration projects, showcasing professional workspace with design materials and planning boards"
                className="w-full h-[500px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl shadow-lg p-4 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Award Winning</p>
                  <p className="text-sm text-muted-foreground">Best Service 2023</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default HeroSection;
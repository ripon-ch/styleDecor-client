import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "../../../components/AppImage.jsx";
import Icon from "../../../components/AppIcon.jsx";

const BangladeshFocus = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const regionalExpertise = [
        {
            icon: "MapPin",
            title: "Local Market Understanding",
            description:
                "Deep knowledge of regional decoration preferences and cultural nuances across Bangladesh."
        },
        {
            icon: "Globe",
            title: "Cultural Sensitivity",
            description:
                "Respecting and celebrating diverse cultural traditions in decoration services nationwide."
        },
        {
            icon: "TrendingUp",
            title: "Regional Expertise",
            description:
                "Specialized decorators familiar with local events, ceremonies, and decoration styles."
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-muted/30" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
                        Proudly Serving Bangladesh
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Bringing professional decoration services to every
                        corner of our beautiful nation
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://img.rocket.new/generatedImages/rocket_gen_img_1bd2d29fd-1765033457453.png"
                                alt="Colorful Bangladesh celebration with traditional decorations, featuring vibrant cultural elements and festive atmosphere representing local decoration traditions"
                                className="w-full h-[400px] object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-3 bg-card/90 backdrop-blur-sm rounded-lg p-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🇧🇩</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">
                                            All 64 Districts
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Complete Nationwide Coverage
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {regionalExpertise?.map((item, index) => (
                            <motion.div
                                key={item?.title}
                                className="flex gap-4 bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2 + index * 0.15
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Icon
                                            name={item?.icon}
                                            size={24}
                                            className="text-primary"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-foreground mb-2">
                                        {item?.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {item?.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 lg:p-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Icon
                        name="Heart"
                        size={48}
                        className="text-primary mx-auto mb-4"
                    />
                    <h3 className="font-heading font-bold text-foreground text-2xl mb-4">
                        Made in Bangladesh, For Bangladesh
                    </h3>
                    <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We're more than a service platform – we're a community
                        of passionate Bangladeshis working together to elevate
                        decoration standards nationwide. Every booking supports
                        local decorators and their families, contributing to
                        economic growth in communities across our country.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default BangladeshFocus;

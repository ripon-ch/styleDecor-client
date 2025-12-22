import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Image from "../../../components/AppImage.jsx";
import Button from "../../../components/ui/Button.jsx";

const HeroSection = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, x: 100 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 80,
                duration: 0.8
            }
        }
    };

    const floatingAnimation = {
        y: [0, -20, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="space-y-6 lg:space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.span
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <span className="text-sm font-medium text-primary">
                                Professional Decoration Services
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight"
                            variants={itemVariants}
                        >
                            Transform Your Space with{" "}
                            <motion.span
                                className="text-primary inline-block"
                                animate={{
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Expert Decorators
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-lg text-muted-foreground max-w-xl"
                            variants={itemVariants}
                        >
                            Connect with Bangladesh's finest decoration
                            professionals for homes, ceremonies, and special
                            events. Book consultations, schedule services, and
                            bring your vision to life.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            variants={itemVariants}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="default"
                                    size="lg"
                                    iconName="Search"
                                    iconPosition="left"
                                    onClick={() =>
                                        navigate("/services-catalog")
                                    }
                                >
                                    Explore Services
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    iconName="Calendar"
                                    iconPosition="left"
                                    onClick={() =>
                                        navigate("/user-authentication")
                                    }
                                >
                                    Book Consultation
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-8 pt-4"
                            variants={itemVariants}
                        >
                            {[
                                { value: "500+", label: "Happy Clients" },
                                { value: "50+", label: "Expert Decorators" },
                                { value: "64", label: "Districts Covered" }
                            ]?.map((stat, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && (
                                        <div className="w-px h-12 bg-border" />
                                    )}
                                    <motion.div
                                        className="text-center"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300
                                        }}
                                    >
                                        <motion.p
                                            className="text-3xl font-bold text-primary"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 0.8 + index * 0.1,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                        >
                                            {stat?.value}
                                        </motion.p>
                                        <p className="text-sm text-muted-foreground">
                                            {stat?.label}
                                        </p>
                                    </motion.div>
                                </React.Fragment>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                        >
                            <motion.div
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            >
                                <Image
                                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1ac61e18a-1765003069630.png"
                                    alt="Elegant living room interior"
                                    className="w-full h-[500px] object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </motion.div>

                        {/* FIX APPLIED HERE: Merged duplicate animate properties */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl shadow-lg p-4 max-w-xs"
                            initial={{ opacity: 0, y: 50, x: -50 }}
                            animate={floatingAnimation}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                                    animate={{
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <span className="text-2xl">🎨</span>
                                </motion.div>
                                <div>
                                    <p className="font-semibold text-foreground">
                                        Premium Quality
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Certified Professionals
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

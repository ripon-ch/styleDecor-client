import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Swal from "sweetalert2";

const ContactForm = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const inquiryTypes = [
        { value: "general", label: "General Inquiry" },
        { value: "booking", label: "Booking Question" },
        { value: "technical", label: "Technical Support" },
        { value: "feedback", label: "Feedback" },
        { value: "partnership", label: "Business Partnership" }
    ];

    const onSubmit = async data => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);

        Swal?.fire({
            icon: "success",
            title: "Message Sent Successfully!",
            text: "We'll get back to you within 24 hours.",
            confirmButtonColor: "var(--color-primary)",
            confirmButtonText: "Great!"
        });

        reset();
        setCharCount(0);
    };

    return (
        <section className="py-16 lg:py-24 bg-background" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
                        Send Us a Message
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Fill out the form below and our team will respond as
                        soon as possible
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid sm:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Full Name *
                                </label>
                                <Input
                                    {...register("name", {
                                        required: "Name is required"
                                    })}
                                    placeholder="Enter your full name"
                                    error={errors?.name?.message}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Email Address *
                                </label>
                                <Input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    type="email"
                                    placeholder="your.email@example.com"
                                    error={errors?.email?.message}
                                />
                            </motion.div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Phone Number
                                </label>
                                <Input
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="+880 1234-567890"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Inquiry Type *
                                </label>
                                <Select
                                    {...register("inquiryType", {
                                        required: "Please select inquiry type"
                                    })}
                                >
                                    <option value="">Select type...</option>
                                    {inquiryTypes?.map(type => (
                                        <option
                                            key={type?.value}
                                            value={type?.value}
                                        >
                                            {type?.label}
                                        </option>
                                    ))}
                                </Select>
                                {errors?.inquiryType && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors?.inquiryType?.message}
                                    </p>
                                )}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Message *
                            </label>
                            <textarea
                                {...register("message", {
                                    required: "Message is required",
                                    minLength: {
                                        value: 10,
                                        message:
                                            "Message must be at least 10 characters"
                                    }
                                })}
                                rows="6"
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                placeholder="Describe your inquiry in detail..."
                                maxLength={500}
                                onChange={e =>
                                    setCharCount(e?.target?.value?.length)
                                }
                            />
                            <div className="flex items-center justify-between mt-2">
                                {errors?.message && (
                                    <p className="text-red-500 text-sm">
                                        {errors?.message?.message}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground ml-auto">
                                    {charCount}/500 characters
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Attach File (Optional)
                            </label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                <Icon
                                    name="Upload"
                                    size={32}
                                    className="text-muted-foreground mx-auto mb-2"
                                />
                                <p className="text-sm text-muted-foreground mb-1">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, PDF up to 10MB
                                </p>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".png,.jpg,.jpeg,.pdf"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <Button
                                type="submit"
                                variant="default"
                                size="lg"
                                fullWidth
                                disabled={isSubmitting}
                                iconName={isSubmitting ? undefined : "Send"}
                                iconPosition="right"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    <motion.div
                        className="mt-6 flex items-start gap-3 bg-muted/50 rounded-lg p-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        <Icon
                            name="Shield"
                            size={20}
                            className="text-primary flex-shrink-0 mt-0.5"
                        />
                        <p className="text-sm text-muted-foreground">
                            Your information is secure and will only be used to
                            respond to your inquiry. We respect your privacy.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;

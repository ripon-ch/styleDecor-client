import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon.jsx";
import Input from "../../../components/ui/Input.jsx";
import Select from "../../../components/ui/Select.jsx";
import { Checkbox } from "../../../components/ui/Checkbox.jsx";

const ProfileSettings = ({ decoratorProfile }) => {
    const [formData, setFormData] = useState(decoratorProfile);
    const [isEditing, setIsEditing] = useState(false);

    const districts = [
        { value: "dhaka", label: "Dhaka" },
        { value: "chittagong", label: "Chittagong" },
        { value: "sylhet", label: "Sylhet" },
        { value: "rajshahi", label: "Rajshahi" },
        { value: "khulna", label: "Khulna" }
    ];

    const thanas = {
        dhaka: [
            { value: "dhanmondi", label: "Dhanmondi" },
            { value: "gulshan", label: "Gulshan" },
            { value: "mirpur", label: "Mirpur" },
            { value: "uttara", label: "Uttara" }
        ]
    };

    const handleInputChange = e => {
        const { name, value, type, checked } = e?.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSave = () => {
        // In real implementation, this would save to backend
        console.log("Saving profile:", formData);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">
                        Profile Settings
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your business profile and preferences
                    </p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
                    >
                        <Icon name="Edit" size={18} color="white" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2.5 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
                        >
                            <Icon name="Save" size={18} color="white" />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-6"
            >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Building" size={20} />
                    Business Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Business Name"
                        name="businessName"
                        value={formData?.businessName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter business name"
                    />

                    <Input
                        label="Owner Name"
                        name="ownerName"
                        value={formData?.ownerName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter owner name"
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter email"
                    />

                    <Input
                        label="Phone Number"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                    />

                    <Input
                        label="Years of Experience"
                        name="experience"
                        value={formData?.experience}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., 8 years"
                    />

                    <Input
                        label="Specialization"
                        name="specialization"
                        value={formData?.specialization}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., Wedding & Corporate Events"
                    />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
            >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Location Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="District"
                        name="district"
                        value={formData?.district}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        options={districts}
                    />

                    <Select
                        label="Thana"
                        name="thana"
                        value={formData?.thana}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        options={thanas?.[formData?.district] || []}
                    />

                    <div className="md:col-span-2">
                        <Input
                            label="Full Address"
                            name="address"
                            value={formData?.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter complete address"
                        />
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6"
            >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Settings" size={20} />
                    Notification Preferences
                </h3>

                <div className="space-y-4">
                    <Checkbox
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={formData?.emailNotifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        label="Email Notifications"
                        description="Receive booking updates and customer messages via email"
                    />

                    <Checkbox
                        id="smsNotifications"
                        name="smsNotifications"
                        checked={formData?.smsNotifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        label="SMS Notifications"
                        description="Get instant SMS alerts for new bookings and urgent updates"
                    />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-lg p-6"
            >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Shield" size={20} />
                    Account Security
                </h3>

                <div className="space-y-3">
                    <button className="w-full md:w-auto px-6 py-2.5 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 font-medium">
                        <Icon name="Lock" size={18} />
                        Change Password
                    </button>

                    <button className="w-full md:w-auto px-6 py-2.5 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 font-medium">
                        <Icon name="Smartphone" size={18} />
                        Enable Two-Factor Authentication
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileSettings;

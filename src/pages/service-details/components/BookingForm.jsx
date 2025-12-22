import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon.jsx";
import Button from "../../../components/ui/Button.jsx";
import Input from "../../../components/ui/Input.jsx";
import Select from "../../../components/ui/Select.jsx";
import { Checkbox } from "../../../components/ui/Checkbox.jsx";
import showAlert from "../../../utils/alert.js";

const BookingForm = ({ service }) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [serviceMode, setServiceMode] = useState("onsite");
    const [district, setDistrict] = useState("");
    const [thana, setThana] = useState("");
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [specialRequirements, setSpecialRequirements] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const districtOptions = [
        { value: "dhaka", label: "Dhaka" },
        { value: "chittagong", label: "Chittagong" },
        { value: "sylhet", label: "Sylhet" },
        { value: "rajshahi", label: "Rajshahi" },
        { value: "khulna", label: "Khulna" },
        { value: "barisal", label: "Barisal" },
        { value: "rangpur", label: "Rangpur" },
        { value: "mymensingh", label: "Mymensingh" }
    ];

    const thanaOptions = {
        dhaka: [
            { value: "gulshan", label: "Gulshan" },
            { value: "dhanmondi", label: "Dhanmondi" },
            { value: "mirpur", label: "Mirpur" },
            { value: "uttara", label: "Uttara" },
            { value: "mohammadpur", label: "Mohammadpur" }
        ],
        chittagong: [
            { value: "agrabad", label: "Agrabad" },
            { value: "panchlaish", label: "Panchlaish" },
            { value: "khulshi", label: "Khulshi" }
        ]
    };

    const timeSlots = [
        { value: "09:00", label: "09:00 AM" },
        { value: "10:00", label: "10:00 AM" },
        { value: "11:00", label: "11:00 AM" },
        { value: "14:00", label: "02:00 PM" },
        { value: "15:00", label: "03:00 PM" },
        { value: "16:00", label: "04:00 PM" }
    ];

    const addons = [
        { id: "lighting", name: "Premium Lighting Setup", price: 5000 },
        { id: "photography", name: "Professional Photography", price: 8000 },
        { id: "catering", name: "Catering Coordination", price: 3000 },
        { id: "entertainment", name: "Entertainment Setup", price: 6000 }
    ];

    const handleAddonToggle = addonId => {
        setSelectedAddons(prev =>
            prev?.includes(addonId)
                ? prev?.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    const calculateTotal = () => {
        const basePrice =
            serviceMode === "onsite" ? service?.price : service?.price * 0.7;
        const addonsTotal = selectedAddons?.reduce((sum, addonId) => {
            const addon = addons?.find(a => a?.id === addonId);
            return sum + (addon?.price || 0);
        }, 0);
        return basePrice + addonsTotal;
    };

    const handleSubmit = e => {
        e?.preventDefault();

        // Add this block - Create formData object from state variables
        const formData = {
            date: selectedDate,
            time: selectedTime,
            location: `${district}, ${thana}`,
            serviceMode,
            addons: selectedAddons,
            specialRequirements
        };

        // Validation
        if (!formData?.date || !formData?.time || !formData?.location) {
            showAlert?.warning(
                "Missing Information",
                "Please fill in all required fields"
            );
            return;
        }

        // Generate booking ID
        const bookingId = `BK${Date.now()}`;
        const bookingDate = new Date(formData?.date)?.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

        showAlert
            ?.confirm(
                "Confirm Booking",
                `Proceed to payment for ${service?.title}?`,
                "Continue to Payment",
                "Cancel"
            )
            ?.then(result => {
                if (result?.isConfirmed) {
                    showAlert?.loading("Processing your booking...");

                    // Simulate processing
                    setTimeout(() => {
                        showAlert?.close();
                        showAlert
                            ?.bookingConfirmed(bookingId, bookingDate)
                            ?.then(() => {
                                navigate("/payment-processing", {
                                    state: {
                                        service,
                                        bookingData: formData,
                                        bookingId
                                    }
                                });
                            });
                    }, 1500);
                }
            });
    };

    const isFormValid = selectedDate && selectedTime && district && thana;

    return (
        <div className="sticky top-24 space-y-6">
            <div className="p-6 bg-card rounded-lg border border-border shadow-base">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                    Book This Service
                </h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 p-3 bg-muted rounded-lg">
                        <button
                            onClick={() => setServiceMode("onsite")}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${
                                serviceMode === "onsite"
                                    ? "bg-primary text-primary-foreground shadow-base"
                                    : "bg-background text-foreground hover:bg-background/80"
                            }`}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Icon name="Home" size={20} />
                                <span className="text-sm">On-Site</span>
                                <span className="text-xs opacity-80">
                                    ৳{service?.price?.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </button>
                        <button
                            onClick={() => setServiceMode("studio")}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${
                                serviceMode === "studio"
                                    ? "bg-primary text-primary-foreground shadow-base"
                                    : "bg-background text-foreground hover:bg-background/80"
                            }`}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Icon name="Building2" size={20} />
                                <span className="text-sm">In-Studio</span>
                                <span className="text-xs opacity-80">
                                    ৳
                                    {Math.round(
                                        service?.price * 0.7
                                    )?.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </button>
                    </div>

                    <Input
                        type="date"
                        label="Select Date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e?.target?.value)}
                        min={new Date()?.toISOString()?.split("T")?.[0]}
                        required
                    />

                    <Select
                        label="Select Time"
                        placeholder="Choose time slot"
                        options={timeSlots}
                        value={selectedTime}
                        onChange={setSelectedTime}
                        required
                    />

                    <Select
                        label="District"
                        placeholder="Select district"
                        options={districtOptions}
                        value={district}
                        onChange={value => {
                            setDistrict(value);
                            setThana("");
                        }}
                        searchable
                        required
                    />

                    {district && (
                        <Select
                            label="Thana"
                            placeholder="Select thana"
                            options={thanaOptions?.[district] || []}
                            value={thana}
                            onChange={setThana}
                            searchable
                            required
                        />
                    )}

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                            Add-ons (Optional)
                        </label>
                        <div className="space-y-2">
                            {addons?.map(addon => (
                                <div
                                    key={addon?.id}
                                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                >
                                    <Checkbox
                                        label={addon?.name}
                                        checked={selectedAddons?.includes(
                                            addon?.id
                                        )}
                                        onChange={() =>
                                            handleAddonToggle(addon?.id)
                                        }
                                    />
                                    <span className="text-sm font-medium text-primary">
                                        +৳
                                        {addon?.price?.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Input
                        type="text"
                        label="Special Requirements"
                        placeholder="Any specific requests or requirements..."
                        value={specialRequirements}
                        onChange={e => setSpecialRequirements(e?.target?.value)}
                        description="Optional: Share any specific needs or preferences"
                    />
                </div>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Service Fee
                        </span>
                        <span className="font-medium text-foreground">
                            ৳
                            {(serviceMode === "onsite"
                                ? service?.price
                                : Math.round(service?.price * 0.7)
                            )?.toLocaleString("en-IN")}
                        </span>
                    </div>
                    {selectedAddons?.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Add-ons
                            </span>
                            <span className="font-medium text-foreground">
                                ৳
                                {selectedAddons
                                    ?.reduce(
                                        (sum, id) =>
                                            sum +
                                            (addons?.find(a => a?.id === id)
                                                ?.price || 0),
                                        0
                                    )
                                    ?.toLocaleString("en-IN")}
                            </span>
                        </div>
                    )}
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                            Total Amount
                        </span>
                        <span className="text-2xl font-bold text-primary">
                            ৳{calculateTotal()?.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>
            <Button
                variant="default"
                size="lg"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                onClick={handleSubmit}
                disabled={!isFormValid}
                loading={isSubmitting}
            >
                Book Now
            </Button>
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Icon
                    name="Info"
                    size={20}
                    color="var(--color-primary)"
                    className="flex-shrink-0 mt-0.5"
                />
                <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">
                        Booking Policy
                    </p>
                    <p>
                        Free cancellation up to 24 hours before the scheduled
                        date. Full refund guaranteed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;

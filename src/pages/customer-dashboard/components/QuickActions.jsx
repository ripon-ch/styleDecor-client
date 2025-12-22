import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon.jsx";

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        {
            icon: "Plus",
            label: "New Booking",
            description: "Book a new decoration service",
            color: "text-primary",
            bgColor: "bg-primary/10",
            onClick: () => navigate("/services-catalog")
        },
        {
            icon: "Heart",
            label: "Favorite Decorators",
            description: "View your saved decorators",
            color: "text-error",
            bgColor: "bg-error/10",
            onClick: () => console.log("View favorites")
        },
        {
            icon: "MessageCircle",
            label: "Contact Support",
            description: "Get help with your bookings",
            color: "text-accent",
            bgColor: "bg-accent/10",
            onClick: () => console.log("Contact support")
        },
        {
            icon: "Gift",
            label: "Offers & Rewards",
            description: "Check available discounts",
            color: "text-warning",
            bgColor: "bg-warning/10",
            onClick: () => console.log("View offers")
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions?.map((action, index) => (
                <button
                    key={index}
                    onClick={action?.onClick}
                    className="bg-card border border-border rounded-lg p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1"
                >
                    <div
                        className={`w-12 h-12 rounded-lg ${action?.bgColor} flex items-center justify-center mb-4`}
                    >
                        <Icon
                            name={action?.icon}
                            size={24}
                            className={action?.color}
                        />
                    </div>
                    <h3 className="text-base font-heading font-semibold text-foreground mb-1">
                        {action?.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {action?.description}
                    </p>
                </button>
            ))}
        </div>
    );
};

export default QuickActions;

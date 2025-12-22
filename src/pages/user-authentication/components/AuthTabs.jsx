import React from "react";
import Icon from "../../../components/AppIcon.jsx";

const AuthTabs = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: "login", label: "Login", icon: "LogIn" },
        { id: "register", label: "Register", icon: "UserPlus" }
    ];

    return (
        <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
            {tabs?.map(tab => (
                <button
                    key={tab?.id}
                    onClick={() => onTabChange(tab?.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === tab?.id
                            ? "bg-background text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                </button>
            ))}
        </div>
    );
};

export default AuthTabs;

import React from "react";
import Icon from "../../../components/AppIcon.jsx";
import Image from "../../../components/AppImage.jsx";

const UpcomingAppointments = ({ appointments }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-foreground">
                    Upcoming Appointments
                </h2>
                <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div className="space-y-4">
                {appointments?.length === 0 ? (
                    <div className="text-center py-8">
                        <Icon
                            name="CalendarX"
                            size={48}
                            className="text-muted-foreground mx-auto mb-3"
                        />
                        <p className="text-muted-foreground">
                            No upcoming appointments
                        </p>
                    </div>
                ) : (
                    appointments?.map(appointment => (
                        <div
                            key={appointment?.id}
                            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={appointment?.serviceImage}
                                    alt={appointment?.serviceImageAlt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-heading font-semibold text-foreground truncate">
                                    {appointment?.serviceName}
                                </h3>
                                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                    <Icon name="Calendar" size={14} />
                                    <span>{appointment?.date}</span>
                                    <span>•</span>
                                    <Icon name="Clock" size={14} />
                                    <span>{appointment?.time}</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <span className="text-sm font-medium text-primary">
                                    {appointment?.daysUntil} days
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UpcomingAppointments;

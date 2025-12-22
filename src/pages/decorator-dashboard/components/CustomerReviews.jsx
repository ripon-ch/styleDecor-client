import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon.jsx";
import AppImage from "../../../components/AppImage.jsx";

const CustomerReviews = ({ reviews }) => {
    const [filterRating, setFilterRating] = useState("All");
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");

    const ratingFilters = ["All", "5", "4", "3", "2", "1"];

    const filteredReviews =
        filterRating === "All"
            ? reviews
            : reviews?.filter(
                  review => review?.rating === parseInt(filterRating)
              );

    const renderStars = rating => {
        return [...Array(5)]?.map((_, index) => (
            <Icon
                key={index}
                name={index < rating ? "Star" : "Star"}
                size={16}
                color={index < rating ? "#fbbf24" : "#d1d5db"}
                fill={index < rating ? "#fbbf24" : "none"}
            />
        ));
    };

    const handleReply = reviewId => {
        // In real implementation, this would save to backend
        console.log("Replying to review:", reviewId, replyText);
        setReplyingTo(null);
        setReplyText("");
    };

    const averageRating =
        reviews?.reduce((sum, review) => sum + review?.rating, 0) /
        reviews?.length;
    const ratingDistribution = [5, 4, 3, 2, 1]?.map(rating => ({
        rating,
        count: reviews?.filter(r => r?.rating === rating)?.length,
        percentage:
            (reviews?.filter(r => r?.rating === rating)?.length /
                reviews?.length) *
            100
    }));

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-foreground mb-1">
                    Customer Reviews
                </h2>
                <p className="text-sm text-muted-foreground">
                    Manage and respond to customer feedback
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg p-6"
                >
                    <div className="text-center">
                        <div className="text-5xl font-bold mb-2">
                            {averageRating?.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {renderStars(Math?.round(averageRating))}
                        </div>
                        <p className="text-sm opacity-90">
                            Based on {reviews?.length} reviews
                        </p>
                    </div>
                </motion.div>

                <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                        Rating Distribution
                    </h3>
                    <div className="space-y-2">
                        {ratingDistribution?.map(
                            ({ rating, count, percentage }) => (
                                <div
                                    key={rating}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex items-center gap-1 w-16">
                                        <span className="text-sm font-medium text-foreground">
                                            {rating}
                                        </span>
                                        <Icon
                                            name="Star"
                                            size={14}
                                            color="#fbbf24"
                                            fill="#fbbf24"
                                        />
                                    </div>
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${percentage}%`
                                            }}
                                            transition={{
                                                duration: 1,
                                                delay: rating * 0.1
                                            }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                    <span className="text-sm text-muted-foreground w-12 text-right">
                                        {count}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {ratingFilters?.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setFilterRating(filter)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            filterRating === filter
                                ? "bg-primary text-white"
                                : "bg-muted text-foreground hover:bg-muted/70"
                        }`}
                    >
                        {filter === "All" ? "All Reviews" : `${filter} Stars`}
                    </button>
                ))}
            </div>
            <div className="space-y-4">
                {filteredReviews?.map((review, index) => (
                    <motion.div
                        key={review?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                <AppImage
                                    src={review?.customerImage}
                                    alt={review?.customerImageAlt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold text-foreground">
                                            {review?.customerName}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            {review?.service}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 mb-1">
                                            {renderStars(review?.rating)}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {review?.date}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-foreground leading-relaxed">
                                    {review?.review}
                                </p>
                            </div>
                        </div>

                        {review?.response ? (
                            <div className="ml-16 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon
                                        name="MessageCircle"
                                        size={16}
                                        color="var(--color-primary)"
                                    />
                                    <span className="text-sm font-semibold text-primary">
                                        Your Response
                                    </span>
                                </div>
                                <p className="text-sm text-foreground">
                                    {review?.response}
                                </p>
                            </div>
                        ) : (
                            <div className="ml-16">
                                {replyingTo === review?.id ? (
                                    <div className="space-y-2">
                                        <textarea
                                            value={replyText}
                                            onChange={e =>
                                                setReplyText(e?.target?.value)
                                            }
                                            placeholder="Write your response..."
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                                            rows={3}
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleReply(review?.id)
                                                }
                                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                                            >
                                                Send Response
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setReplyingTo(null);
                                                    setReplyText("");
                                                }}
                                                className="px-4 py-2 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setReplyingTo(review?.id)
                                        }
                                        className="px-4 py-2 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Icon name="MessageCircle" size={16} />
                                        Reply to Review
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
            {filteredReviews?.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon
                            name="MessageCircle"
                            size={32}
                            color="var(--color-muted-foreground)"
                        />
                    </div>
                    <p className="text-muted-foreground">
                        No reviews found for the selected rating
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomerReviews;

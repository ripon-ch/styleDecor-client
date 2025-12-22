import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const ratingDistribution = [
    { stars: 5, count: 145, percentage: 72 },
    { stars: 4, count: 38, percentage: 19 },
    { stars: 3, count: 12, percentage: 6 },
    { stars: 2, count: 4, percentage: 2 },
    { stars: 1, count: 2, percentage: 1 }
  ];

  const handleLoadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, reviews?.length));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-semibold text-foreground">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <Icon name="Star" size={20} color="var(--color-accent)" fill="var(--color-accent)" />
          <span className="text-xl font-bold text-foreground">{averageRating}</span>
          <span className="text-muted-foreground">({totalReviews} reviews)</span>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="p-6 bg-card rounded-lg border border-border">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-foreground mb-2">{averageRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={20}
                    color="var(--color-accent)"
                    fill={star <= Math.round(averageRating) ? 'var(--color-accent)' : 'none'}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
            </div>

            <div className="space-y-3">
              {ratingDistribution?.map((rating) => (
                <div key={rating?.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium text-foreground">{rating?.stars}</span>
                    <Icon name="Star" size={14} color="var(--color-accent)" fill="var(--color-accent)" />
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${rating?.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{rating?.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {reviews?.slice(0, visibleReviews)?.map((review) => (
            <div key={review?.id} className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={review?.userImage}
                  alt={review?.userImageAlt}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground">{review?.userName}</h4>
                    <span className="text-sm text-muted-foreground">{review?.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={16}
                        color="var(--color-accent)"
                        fill={star <= review?.rating ? 'var(--color-accent)' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-foreground leading-relaxed mb-4">{review?.comment}</p>

              {review?.images && review?.images?.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {review?.images?.map((img, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden border border-border">
                      <Image
                        src={img?.url}
                        alt={img?.alt}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {review?.response && (
                <div className="mt-4 p-4 bg-muted rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MessageSquare" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">Decorator Response</span>
                  </div>
                  <p className="text-sm text-foreground">{review?.response}</p>
                </div>
              )}
            </div>
          ))}

          {visibleReviews < reviews?.length && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
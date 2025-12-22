import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { serviceAPI as serviceService } from '../../services/api/serviceAPI.js';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import PrimaryNav from '@/components/navigation/PrimaryNav.jsx';
import Breadcrumb from '@/components/navigation/Breadcrumb.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import ServiceInfo from './components/ServiceInfo.jsx';
import BookingForm from './components/BookingForm.jsx';
import ReviewsSection from './components/ReviewsSection.jsx';
import Footer from '../home-landing/components/Footer.jsx';

export default function ServiceDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const showBooking = searchParams?.get('booking') === 'true';
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await serviceService?.getById(id);
      setService(data || { id: 99, serviceName: "Grand Wedding Decor", description: "Premium floral and lighting setup featuring elegant white and gold themes, traditional Bangladeshi floral garlands, and professional lighting coordination.", serviceCategory: "Wedding", cost: 5000, unit: "event", rating: 5.0, reviewCount: 125, decoratorName: "Elite Events", location: "Dhaka" });
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Service not found'}</p>
          <button
            onClick={() => window.history?.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = [
  {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_192368848-1764923909514.png",
    alt: "Elegant wedding stage decoration with white and gold theme featuring floral arrangements and draped fabrics under warm lighting"
  },
  {
    url: "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506",
    alt: "Luxurious wedding reception hall with round tables decorated with white linens and pink floral centerpieces"
  },
  {
    url: "https://images.unsplash.com/photo-1566231900271-8b6bcb8baea8",
    alt: "Beautiful wedding ceremony setup with white chairs arranged in rows and floral arch at the altar"
  },
  {
    url: "https://images.unsplash.com/photo-1690588810563-5793f3fe74c3",
    alt: "Romantic outdoor wedding decoration with hanging lights and white fabric draping between trees"
  },
  {
    url: "https://images.unsplash.com/photo-1732382643875-9cc3cd56c0da",
    alt: "Stunning wedding entrance decoration with floral garlands and traditional Bangladeshi welcome setup"
  },
  {
    url: "https://images.unsplash.com/photo-1683918023703-b9e537e818f6",
    alt: "Elegant wedding table setting with gold charger plates and tall floral centerpieces"
  }];


  const reviewsData = [
  {
    id: 1,
    userName: "Nusrat Jahan",
    userImage: "https://images.unsplash.com/photo-1714236857540-c1fb413415e5",
    userImageAlt: "Portrait of happy Bangladeshi bride Nusrat Jahan with traditional bridal makeup and jewelry",
    rating: 5,
    date: "15/11/2025",
    comment: "Absolutely stunning work! Fatima and her team transformed our wedding venue into a dream. The attention to detail was incredible, and they perfectly captured our vision. Every guest was amazed by the beautiful decorations. Highly recommend for anyone looking for professional wedding decoration services in Dhaka.",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_192368848-1764923909514.png",
      alt: "Wedding venue decorated with elegant white and gold theme"
    },
    {
      url: "https://images.unsplash.com/photo-1526523348280-cb27357c8ba0",
      alt: "Reception hall with beautiful table decorations"
    }],

    response: "Thank you so much for your kind words, Nusrat! It was an absolute pleasure working on your special day. We're thrilled that you and your guests loved the decorations. Wishing you both a lifetime of happiness!"
  },
  {
    id: 2,
    userName: "Kamal Hossain",
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d126af2f-1763293474375.png",
    userImageAlt: "Professional headshot of Bangladeshi groom Kamal Hossain in formal wedding attire",
    rating: 5,
    date: "08/11/2025",
    comment: "Outstanding service from start to finish. The team was professional, punctual, and incredibly creative. They worked within our budget and delivered beyond our expectations. The lighting setup was particularly impressive. Worth every taka!",
    images: []
  },
  {
    id: 3,
    userName: "Ayesha Siddiqui",
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1856c0507-1763301330286.png",
    userImageAlt: "Smiling portrait of Bangladeshi woman Ayesha Siddiqui in elegant traditional dress",
    rating: 4,
    date: "02/11/2025",
    comment: "Very good decoration service. The floral arrangements were beautiful and fresh. Setup was completed on time. Only minor issue was some last-minute changes took a bit longer than expected, but overall very satisfied with the result.",
    images: [
    {
      url: "https://images.unsplash.com/photo-1647977846821-47c07f2087b2",
      alt: "Beautiful ceremony setup with floral decorations"
    }],

    response: "Thank you for your feedback, Ayesha! We apologize for the delay with the last-minute changes. We're constantly working to improve our service. We're glad you were happy with the final result!"
  },
  {
    id: 4,
    userName: "Rafiq Ahmed",
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15c1b7d35-1763301327624.png",
    userImageAlt: "Portrait of middle-aged Bangladeshi man Rafiq Ahmed in formal business attire",
    rating: 5,
    date: "25/10/2025",
    comment: "Hired them for my daughter's wedding in Chittagong. Excellent coordination and beautiful execution. The stage decoration was magnificent. They understood our cultural requirements perfectly and incorporated traditional elements beautifully.",
    images: []
  },
  {
    id: 5,
    userName: "Sabrina Khan",
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10fb083fa-1763296324852.png",
    userImageAlt: "Professional portrait of Bangladeshi woman Sabrina Khan with modern styling",
    rating: 5,
    date: "18/10/2025",
    comment: "Best decoration service in Dhaka! The team is creative, professional, and very accommodating. They helped us choose the perfect color scheme and the result was breathtaking. Our guests are still talking about how beautiful everything looked.",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee31d7fd-1764686162757.png",
      alt: "Romantic outdoor wedding decoration setup"
    },
    {
      url: "https://images.unsplash.com/photo-1674268761631-da70639e73aa",
      alt: "Wedding entrance with floral decorations"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_17bf68db9-1764887400487.png",
      alt: "Elegant table setting with centerpieces"
    }]

  },
  {
    id: 6,
    userName: "Imran Chowdhury",
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_197bb8b51-1763294369934.png",
    userImageAlt: "Casual portrait of young Bangladeshi man Imran Chowdhury smiling",
    rating: 4,
    date: "10/10/2025",
    comment: "Great service and reasonable pricing. The decoration quality was excellent. Communication was smooth throughout the planning process. Would definitely recommend to friends and family.",
    images: []
  }];


  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <Breadcrumb />

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={galleryImages} />
            <ServiceInfo service={service} />
            <ReviewsSection
              reviews={reviewsData}
              averageRating={service?.rating}
              totalReviews={service?.reviewCount} />

          </div>

          <div className="lg:col-span-1">
            <BookingForm service={service} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
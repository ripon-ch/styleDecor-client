import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.jsx';
import AppImage from '../../../components/AppImage.jsx';

const PortfolioManagement = ({ portfolioItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Wedding', 'Corporate', 'Birthday', 'Other'];

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems?.filter(item => item?.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Portfolio Management</h2>
          <p className="text-sm text-muted-foreground">Showcase your work and attract more clients</p>
        </div>
        <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium">
          <Icon name="Plus" size={18} color="white" />
          Add New Project
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white' :'bg-muted text-foreground hover:bg-muted/70'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems?.map((item, index) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-48 overflow-hidden">
              <AppImage 
                src={item?.image}
                alt={item?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                {item?.category}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">{item?.title}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">৳{item?.price?.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Icon name="Eye" size={14} />
                    <span className="text-xs">Views</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item?.views}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Icon name="Heart" size={14} />
                    <span className="text-xs">Likes</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item?.likes}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Icon name="ShoppingBag" size={14} />
                    <span className="text-xs">Booked</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item?.bookings}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Icon name="Edit" size={14} />
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Icon name="Share2" size={14} />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {filteredItems?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Image" size={32} color="var(--color-muted-foreground)" />
          </div>
          <p className="text-muted-foreground">No portfolio items found in this category</p>
          <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Add Your First Project
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
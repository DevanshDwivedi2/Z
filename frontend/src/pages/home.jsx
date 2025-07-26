import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  Star, 
  Clock, 
  MapPin, 
  Filter, 
  Search, 
  Heart,
  ChevronDown,
  Truck,
} from 'lucide-react';

const RestaurantListings = () => {
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({
    offers: false,
    rating: '',
    petFriendly: false,
    outdoorSeating: false,
    servesAlcohol: false,
    openNow: false
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const restaurants = [
    {
      id: 1,
      name: "Rominus Pizza And Burger",
      cuisine: "Pizza, Fast Food, Pasta, Burger",
      rating: 4.2,
      location: "Meerapur, Allahabad",
      distance: "2.9 km",
      price: "₹400 for two",
      deliveryTime: "25-30 mins",
      image: "/api/placeholder/300/200",
      discount: "50% OFF",
      isOpen: true,
      tags: ["Pizza", "Burger", "Fast Food"],
      features: ["Outdoor Seating"]
    },
    {
      id: 2,
      name: "McDonald's",
      cuisine: "Burger, Fast Food, Beverages",
      rating: 4.1,
      location: "Civil Lines, Allahabad",
      distance: "1.4 km",
      price: "₹500 for two",
      deliveryTime: "20-25 mins",
      image: "/api/placeholder/300/200",
      discount: "20% OFF",
      isOpen: true,
      tags: ["Burger", "Fast Food", "American"],
      features: ["Pet Friendly"]
    },
    {
      id: 3,
      name: "Barbeque Nation",
      cuisine: "North Indian, BBQ, Biryani",
      rating: 4.9,
      location: "George Town, Allahabad",
      distance: "1 km",
      price: "₹1,550 for two",
      deliveryTime: "35-40 mins",
      image: "/api/placeholder/300/200",
      discount: "30% OFF",
      isOpen: true,
      tags: ["BBQ", "North Indian", "Biryani"],
      features: ["Serves Alcohol", "Outdoor Seating"]
    },
    {
      id: 4,
      name: "Cafe Coffee Day",
      cuisine: "Cafe, Beverages, Desserts",
      rating: 4.0,
      location: "Civil Lines, Allahabad",
      distance: "2.1 km",
      price: "₹300 for two",
      deliveryTime: "15-20 mins",
      image: "/api/placeholder/300/200",
      isOpen: false,
      tags: ["Cafe", "Coffee", "Desserts"],
      features: ["Pet Friendly", "Outdoor Seating"]
    },
    {
      id: 5,
      name: "Domino's Pizza",
      cuisine: "Pizza, Fast Food, Italian",
      rating: 4.3,
      location: "Katra, Allahabad",
      distance: "3.2 km",
      price: "₹450 for two",
      deliveryTime: "30-35 mins",
      image: "/api/placeholder/300/200",
      discount: "40% OFF",
      isOpen: true,
      tags: ["Pizza", "Italian", "Fast Food"],
      features: []
    },
    {
      id: 6,
      name: "The Yellow Chilli",
      cuisine: "North Indian, Chinese, Continental",
      rating: 4.5,
      location: "Tagore Town, Allahabad",
      distance: "4.5 km",
      price: "₹800 for two",
      deliveryTime: "40-45 mins",
      image: "/api/placeholder/300/200",
      discount: "25% OFF",
      isOpen: true,
      tags: ["North Indian", "Chinese", "Continental"],
      features: ["Serves Alcohol"]
    }
  ];

  const toggleFavorite = (restaurantId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(restaurantId)) {
      newFavorites.delete(restaurantId);
    } else {
      newFavorites.add(restaurantId);
    }
    setFavorites(newFavorites);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedFilters.openNow && !restaurant.isOpen) return false;
    if (selectedFilters.offers && !restaurant.discount) return false;
    if (selectedFilters.rating && restaurant.rating < parseFloat(selectedFilters.rating)) return false;
    if (selectedFilters.petFriendly && !restaurant.features.includes("Pet Friendly")) return false;
    if (selectedFilters.outdoorSeating && !restaurant.features.includes("Outdoor Seating")) return false;
    if (selectedFilters.servesAlcohol && !restaurant.features.includes("Serves Alcohol")) return false;
    
    return true;
  });

  return (
    <div className="restaurant-app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .restaurant-app {
          min-height: 100vh;
          background: #0a0a0a;
          color: white;
        }

        /* Header Styles */
        .app-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .brand-title {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .header-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        /* Main Container */
        .main-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        /* Search and Filter Section */
        .search-filter-section {
          margin-bottom: 2rem;
        }

        .search-container {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: white;
          font-size: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-input:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        /* Filter Buttons */
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-btn:hover {
          background: rgba(255, 107, 53, 0.1);
          border-color: #ff6b35;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          border-color: transparent;
          color: white;
        }

        .filter-select {
          position: relative;
        }

        .filter-dropdown {
          padding: 0.5rem 2rem 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          appearance: none;
          backdrop-filter: blur(10px);
        }

        .filter-dropdown option {
          background: #1a1a1a;
          color: white;
        }

        .dropdown-icon {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .results-count {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        /* Restaurant Grid */
        .restaurant-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .restaurant-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: relative;
        }

        .restaurant-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
          border-color: rgba(255, 107, 53, 0.3);
        }

        .card-image {
          position: relative;
          height: 192px;
          background: linear-gradient(135deg, #374151, #1f2937);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-image-placeholder {
          font-size: 4rem;
          opacity: 0.5;
        }

        .discount-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .favorite-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .favorite-btn:hover {
          transform: scale(1.1);
        }

        .favorite-btn.active {
          color: #ff6b35;
        }

        .closed-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .closed-badge {
          color: white;
          font-weight: 600;
          background: #dc2626;
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
        }

        .card-content {
          padding: 1rem;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-weight: bold;
          font-size: 1.125rem;
          color: white;
          line-height: 1.3;
          flex: 1;
        }

        .rating-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          margin-left: 0.5rem;
          flex-shrink: 0;
        }

        .card-cuisine {
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }

        .tag {
          background: #374151;
          color: #d1d5db;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .card-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }

        .location-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .location-separator {
          color: #6b7280;
        }

        .distance {
          white-space: nowrap;
          flex-shrink: 0;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .price {
          color: white;
          font-weight: 500;
        }

        .delivery-time {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #9ca3af;
        }

        .delivery-info {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #ff6b35;
        }

        .delivery-free {
          font-size: 0.75rem;
        }

        .card-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          margin-top: 0.75rem;
        }

        .feature-tag {
          font-size: 0.75rem;
          color: #ff6b35;
          background: rgba(255, 107, 53, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 4rem 0;
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .no-results-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .no-results-text {
          color: #9ca3af;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-container {
            padding: 1rem;
          }

          .header-container {
            padding: 0.75rem;
          }

          .brand-title {
            font-size: 1.25rem;
          }

          .restaurant-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .filter-container {
            gap: 0.5rem;
          }

          .filter-btn {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .rating-badge {
            margin-left: 0;
          }

          .footer-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .search-input {
            padding: 0.875rem 0.875rem 0.875rem 2.5rem;
          }

          .search-icon {
            left: 0.75rem;
          }
        }
      `}</style>

{/* Header */}
<header className="app-header">
  <div className="header-container">
    <div className="header-brand">
      <div className="brand-icon">🍕</div>
      <h1 className="brand-title">FoodieExpress</h1>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div className="header-location">
        <MapPin size={16} />
        <span>Allahabad</span>
      </div>
      {/* ADD THIS LOGOUT BUTTON */}
      <button 
        onClick={() => navigate('/auth')}
        style={{
          padding: '0.5rem 1rem',
          background: 'rgba(255, 107, 53, 0.1)',
          border: '1px solid rgba(255, 107, 53, 0.3)',
          borderRadius: '8px',
          color: '#ff6b35',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}
      >
        Sign Out
      </button>
    </div>
  </div>
</header>
      <div className="main-container">
        {/* Search and Filters */}
        <div className="search-filter-section">
          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filter Buttons */}
          <div className="filter-container">
            <button className="filter-btn">
              <Filter size={16} />
              Filters
            </button>
            
            <button 
              onClick={() => handleFilterChange('offers', !selectedFilters.offers)}
              className={`filter-btn ${selectedFilters.offers ? 'active' : ''}`}
            >
              Offers
            </button>
            
            <div className="filter-select">
              <select 
                value={selectedFilters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="filter-dropdown"
              >
                <option value="">Rating</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
              <ChevronDown className="dropdown-icon" size={16} />
            </div>
            
            <button 
              onClick={() => handleFilterChange('petFriendly', !selectedFilters.petFriendly)}
              className={`filter-btn ${selectedFilters.petFriendly ? 'active' : ''}`}
            >
              Pet Friendly
            </button>
            
            <button 
              onClick={() => handleFilterChange('outdoorSeating', !selectedFilters.outdoorSeating)}
              className={`filter-btn ${selectedFilters.outdoorSeating ? 'active' : ''}`}
            >
              Outdoor Seating
            </button>
            
            <button 
              onClick={() => handleFilterChange('servesAlcohol', !selectedFilters.servesAlcohol)}
              className={`filter-btn ${selectedFilters.servesAlcohol ? 'active' : ''}`}
            >
              Serves Alcohol
            </button>
            
            <button 
              onClick={() => handleFilterChange('openNow', !selectedFilters.openNow)}
              className={`filter-btn ${selectedFilters.openNow ? 'active' : ''}`}
            >
              Open Now
            </button>
          </div>

          <p className="results-count">
            {filteredRestaurants.length} restaurants found in Allahabad
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              {/* Restaurant Image */}
              <div className="card-image">
                <div className="card-image-placeholder">🍽️</div>
                
                {/* Discount Badge */}
                {restaurant.discount && (
                  <div className="discount-badge">
                    {restaurant.discount}
                  </div>
                )}
                
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(restaurant.id)}
                  className={`favorite-btn ${favorites.has(restaurant.id) ? 'active' : ''}`}
                >
                  <Heart size={18} fill={favorites.has(restaurant.id) ? 'currentColor' : 'none'} />
                </button>
                
                {/* Closed Overlay */}
                {!restaurant.isOpen && (
                  <div className="closed-overlay">
                    <span className="closed-badge">CLOSED</span>
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{restaurant.name}</h3>
                  <div className="rating-badge">
                    <Star size={12} fill="currentColor" />
                    {restaurant.rating}
                  </div>
                </div>
                
                <p className="card-cuisine">{restaurant.cuisine}</p>
                
                {/* Tags */}
                <div className="card-tags">
                  {restaurant.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Location and Distance */}
                <div className="card-location">
                  <MapPin size={14} />
                  <span className="location-text">{restaurant.location}</span>
                  <span className="location-separator">•</span>
                  <span className="distance">{restaurant.distance}</span>
                </div>
                
                {/* Price and Delivery Time */}
                <div className="card-footer">
                  <div className="footer-left">
                    <span className="price">{restaurant.price}</span>
                    <div className="delivery-time">
                      <Clock size={14} />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="delivery-info">
                    <Truck size={14} />
                    <span className="delivery-free">FREE</span>
                  </div>
                </div>
                
                {/* Features */}
                {restaurant.features.length > 0 && (
                  <div className="card-features">
                    {restaurant.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3 className="no-results-title">No restaurants found</h3>
            <p className="no-results-text">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListings;
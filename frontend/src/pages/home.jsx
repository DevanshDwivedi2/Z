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
export function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-2xl font-bold">Welcome to Home Page</h1>
      <button
        onClick={() => navigate('/auth')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Login / Signup
      </button>
    </div>
  );
}

const RestaurantListings = () => {
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
    <div className="min-h-screen bg-black text-white">
      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, #ff6b35, #ec4899);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .restaurant-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }
        
        .restaurant-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
          border-color: rgba(255, 107, 53, 0.3);
        }
        
        .filter-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
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
        
        .search-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .search-input:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }
        
        .discount-badge {
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .favorite-btn {
          transition: all 0.3s ease;
        }
        
        .favorite-btn:hover {
          transform: scale(1.1);
        }
        
        .favorite-btn.active {
          color: #ff6b35;
        }
        
        .rating-badge {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .closed-overlay {
          background: rgba(0, 0, 0, 0.7);
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-xl">
                🍕
              </div>
              <h1 className="text-2xl font-bold">FoodieExpress</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={16} />
              <span>Allahabad</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 search-input rounded-2xl text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button className="filter-btn px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">
              <Filter size={16} />
              Filters
            </button>
            
            <button 
              onClick={() => handleFilterChange('offers', !selectedFilters.offers)}
              className={`filter-btn px-4 py-2 rounded-xl text-sm font-medium ${selectedFilters.offers ? 'active' : ''}`}
            >
              Offers
            </button>
            
            <div className="relative">
              <select 
                value={selectedFilters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="filter-btn px-4 py-2 rounded-xl text-sm font-medium appearance-none pr-8 cursor-pointer"
              >
                <option value="">Rating</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} />
            </div>
            
            <button 
              onClick={() => handleFilterChange('petFriendly', !selectedFilters.petFriendly)}
              className={`filter-btn px-4 py-2 rounded-xl text-sm font-medium ${selectedFilters.petFriendly ? 'active' : ''}`}
            >
              Pet Friendly
            </button>
            
            <button 
              onClick={() => handleFilterChange('outdoorSeating', !selectedFilters.outdoorSeating)}
              className={`filter-btn px-4 py-2 rounded-xl text-sm font-medium ${selectedFilters.outdoorSeating ? 'active' : ''}`}
            >
              Outdoor Seating
            </button>
            
            <button 
              onClick={() => handleFilterChange('servesAlcohol', !selectedFilters.servesAlcohol)}
              className={`filter-btn px-4 py-2 rounded-xl text-sm font-medium ${selectedFilters.servesAlcohol ? 'active' : ''}`}
            >
              Serves Alcohol
            </button>
            
            <button 
              onClick={() => handleFilterChange('openNow', !selectedFilters.openNow)}
              className={`filter-btn px-4 py-2 rounded-xl text-sm font-medium ${selectedFilters.openNow ? 'active' : ''}`}
            >
              Open Now
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            {filteredRestaurants.length} restaurants found in Allahabad
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card rounded-2xl overflow-hidden relative">
              {/* Restaurant Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-6xl opacity-50">🍽️</div>
                
                {/* Discount Badge */}
                {restaurant.discount && (
                  <div className="absolute top-3 left-3 discount-badge text-white text-xs font-bold px-2 py-1 rounded-lg">
                    {restaurant.discount}
                  </div>
                )}
                
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(restaurant.id)}
                  className={`absolute top-3 right-3 favorite-btn p-2 glass-effect rounded-lg ${favorites.has(restaurant.id) ? 'active' : 'text-gray-400'}`}
                >
                  <Heart size={18} fill={favorites.has(restaurant.id) ? 'currentColor' : 'none'} />
                </button>
                
                {/* Closed Overlay */}
                {!restaurant.isOpen && (
                  <div className="absolute inset-0 closed-overlay flex items-center justify-center">
                    <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-lg">CLOSED</span>
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-white leading-tight">{restaurant.name}</h3>
                  <div className="rating-badge px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold text-white ml-2">
                    <Star size={12} fill="currentColor" />
                    {restaurant.rating}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-1">{restaurant.cuisine}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Location and Distance */}
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                  <MapPin size={14} />
                  <span className="truncate">{restaurant.location}</span>
                  <span className="text-gray-600">•</span>
                  <span className="whitespace-nowrap">{restaurant.distance}</span>
                </div>
                
                {/* Price and Delivery Time */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium">{restaurant.price}</span>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={14} />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Truck size={14} />
                    <span className="text-xs">FREE</span>
                  </div>
                </div>
                
                {/* Features */}
                {restaurant.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {restaurant.features.map((feature, index) => (
                      <span key={index} className="text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-md">
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
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-xl font-bold mb-2">No restaurants found</h3>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListings;

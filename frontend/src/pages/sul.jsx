import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, X, ShoppingBag, Star, MapPin } from 'lucide-react';

const FoodDeliveryApp = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Sign up data:', formData);
      navigate('/rest');
    } else {
      console.log('Sign in data:', { email: formData.email, password: formData.password });
      navigate('/rest');
    }
    // Close modal after submission
    setShowAuth(false);
  };

  const openAuth = (signUp = false) => {
    setIsSignUp(signUp);
    setShowAuth(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  const closeAuth = () => {
    setShowAuth(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="app-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .app-container {
          min-height: 100vh;
          background: #0a0a0a;
          color: white;
        }

        /* Header Styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff6b35;
        }

        .nav-buttons {
          display: flex;
          gap: 1rem;
        }

        .nav-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-btn:hover {
          background: rgba(255, 107, 53, 0.1);
          border-color: #ff6b35;
        }

        .nav-btn.primary {
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          border: none;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }

        .nav-btn.primary:hover {
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
          transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
          margin-top: 80px;
          padding: 4rem 2rem;
          text-align: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ff6b35, #ec4899, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.5)); }
          to { filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.7)); }
        }

        .hero p {
          font-size: 1.2rem;
          color: #d1d5db;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 1rem 2rem;
          border-radius: 16px;
          border: none;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-btn.primary {
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          color: white;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        }

        .hero-btn.primary:hover {
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
          transform: translateY(-3px);
        }

        .hero-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .hero-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Featured Section */
        .featured {
          padding: 4rem 2rem;
          background: #111;
        }

        .featured h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 3rem;
          color: white;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .featured-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .featured-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff6b35, #ec4899, #8b5cf6);
        }

        .featured-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .card-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }

        .card-desc {
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #fbbf24;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
          max-width: 450px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          backdrop-filter: blur(20px);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 2rem 2rem 0 2rem;
          text-align: center;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #d1d5db;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255, 107, 53, 0.2);
          color: #ff6b35;
          transform: rotate(90deg);
        }

        .modal-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .modal-brand-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
        }

        .modal-brand-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
        }

        .modal-subtitle {
          color: #d1d5db;
          margin-bottom: 2rem;
        }

        .toggle-container {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 4px;
          margin: 0 2rem 2rem 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .toggle-btn {
          flex: 1;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          color: #d1d5db;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
          transform: scale(1.02);
        }

        .toggle-btn:hover:not(.active) {
          color: white;
        }

        .form-container {
          padding: 0 2rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 20px;
          height: 20px;
          transition: color 0.3s ease;
        }

        .input-group:focus-within .input-icon {
          color: #ff6b35;
        }

        .form-input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-input::placeholder {
          color: #6b7280;
        }

        .form-input:focus {
          outline: none;
          border-color: #ff6b35;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .password-input {
          padding-right: 48px;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #ff6b35;
        }

        .forgot-password {
          text-align: right;
          margin-top: -10px;
        }

        .forgot-link {
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #ff6b35;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #ff6b35, #ec4899);
          color: white;
          font-weight: 600;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
          transform: scale(1.02);
        }

        .submit-btn:active {
          transform: scale(0.98);
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
        }

        .divider-text {
          padding: 0 16px;
          color: #9ca3af;
          font-size: 14px;
        }

        .google-btn {
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          backdrop-filter: blur(10px);
        }

        .google-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .terms {
          font-size: 12px;
          color: #9ca3af;
          text-align: center;
          margin-top: 24px;
          line-height: 1.5;
        }

        .terms-link {
          color: #ff6b35;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .terms-link:hover {
          color: #ec4899;
        }

        @media (max-width: 768px) {
          .header {
            padding: 1rem;
          }
          
          .nav-buttons {
            gap: 0.5rem;
          }
          
          .nav-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .modal-content {
            margin: 1rem;
          }
          
          .form-container {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }
          
          .modal-header {
            padding: 1.5rem 1.5rem 0 1.5rem;
          }
          
          .toggle-container {
            margin: 0 1.5rem 1.5rem 1.5rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="logo">
          🍕 <span>FoodieExpress</span>
        </div>
        <div className="nav-buttons">
          <button 
            className="nav-btn"
            onClick={() => openAuth(false)}
          >
            Sign In
          </button>
          <button 
            className="nav-btn primary"
            onClick={() => openAuth(true)}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Delicious Food, Delivered Fast</h1>
          <p>
            Craving something delicious? We deliver your favorite meals from the best restaurants 
            in your city. Fresh ingredients, amazing flavors, and lightning-fast delivery.
          </p>
          <div className="hero-buttons">
            <button 
              className="hero-btn primary"
              onClick={() => openAuth(true)}
            >
              <ShoppingBag size={20} />
              Start Ordering
            </button>
            <button 
              className="hero-btn secondary"
              onClick={() => openAuth(false)}
            >
              <MapPin size={20} />
              Explore Restaurants
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured">
        <h2>Why Choose FoodieExpress?</h2>
        <div className="featured-grid">
          <div className="featured-card">
            <div className="card-header">
              <div className="card-icon">
                ⚡
              </div>
              <h3 className="card-title">Lightning Fast</h3>
            </div>
            <p className="card-desc">
              Get your food delivered in 30 minutes or less. We work with the fastest delivery partners.
            </p>
            <div className="card-rating">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span>5.0 Rating</span>
            </div>
          </div>

          <div className="featured-card">
            <div className="card-header">
              <div className="card-icon">
                🍽️
              </div>
              <h3 className="card-title">Premium Quality</h3>
            </div>
            <p className="card-desc">
              We partner with top restaurants to bring you the highest quality meals made with fresh ingredients.
            </p>
            <div className="card-rating">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span>1000+ Restaurants</span>
            </div>
          </div>

          <div className="featured-card">
            <div className="card-header">
              <div className="card-icon">
                💰
              </div>
              <h3 className="card-title">Best Prices</h3>
            </div>
            <p className="card-desc">
              Enjoy competitive prices with exclusive deals and discounts. Great food doesn't have to break the bank.
            </p>
            <div className="card-rating">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span>50% Off Deals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuth && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeAuth()}>
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-btn" onClick={closeAuth}>
                <X size={20} />
              </button>
              
              <div className="modal-brand">
                <div className="modal-brand-icon">🍕</div>
                <h2 className="modal-brand-title">FoodieExpress</h2>
              </div>
              
              <p className="modal-subtitle">
                {isSignUp ? 'Join thousands of food lovers' : 'Welcome back, foodie!'}
              </p>
            </div>

            <div className="toggle-container">
              <button
                onClick={() => setIsSignUp(false)}
                className={`toggle-btn ${!isSignUp ? 'active' : ''}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`toggle-btn ${isSignUp ? 'active' : ''}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
              {isSignUp && (
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="form-input"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="form-input"
                  required
                />
              </div>

              {isSignUp && (
                <div className="input-group">
                  <Phone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="form-input"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="form-input password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isSignUp && (
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="form-input password-input"
                    required={isSignUp}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}

              {!isSignUp && (
                <div className="forgot-password">
                  <button type="button" className="forgot-link">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">or</span>
                <div className="divider-line"></div>
              </div>

              <button type="button" className="google-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {isSignUp && (
                <p className="terms">
                  By creating an account, you agree to our{' '}
                  <button className="terms-link">Terms of Service</button>
                  {' '}and{' '}
                  <button className="terms-link">Privacy Policy</button>
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDeliveryApp;
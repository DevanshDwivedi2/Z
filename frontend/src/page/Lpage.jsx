import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Mouse tracking for animations
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #111118 30%, #1a1a2e 60%, #0f1419 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements that follow mouse */}
      <div style={{
        position: 'fixed',
        top: `${mousePos.y * 0.1}%`,
        left: `${mousePos.x * 0.1}%`,
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 100, 200, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: 0,
        transition: 'all 0.6s ease-out',
        transform: `translate(-50%, -50%) scale(${1 + mousePos.x * 0.002})`
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: `${100 - mousePos.y * 0.15}%`,
        right: `${mousePos.x * 0.08}%`,
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(30, 144, 255, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        transition: 'all 0.8s ease-out',
        transform: `translate(50%, 50%) rotate(${mousePos.x * 0.1}deg)`
      }}></div>

      <div style={{
        position: 'fixed',
        bottom: `${mousePos.y * 0.05}%`,
        left: `${100 - mousePos.x * 0.12}%`,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(70, 130, 180, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
        transition: 'all 0.7s ease-out',
        transform: `translate(-50%, 50%)`
      }}></div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            width: '2px',
            height: '2px',
            background: `rgba(${100 + i * 30}, ${150 + i * 10}, 255, ${0.3 + i * 0.1})`,
            borderRadius: '50%',
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
            zIndex: 0,
            animation: `float${i} ${3 + i}s ease-in-out infinite`,
            transform: `translate(${mousePos.x * (0.02 + i * 0.01)}px, ${mousePos.y * (0.01 + i * 0.005)}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      ))}

      {/* Main container with mouse-reactive glow */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(15, 15, 25, 0.85)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(100, 150, 255, 0.1)',
        borderRadius: '28px',
        padding: '50px',
        minWidth: '420px',
        boxShadow: `
          0 25px 60px rgba(0, 0, 0, 0.4),
          0 0 100px rgba(${50 + mousePos.x * 0.5}, ${100 + mousePos.y * 0.3}, 255, 0.1)
        `,
        transition: 'all 0.3s ease',
        transform: `
          perspective(1000px) 
          rotateX(${(mousePos.y - 50) * 0.02}deg) 
          rotateY(${(mousePos.x - 50) * 0.02}deg)
          translateZ(0)
        `
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '45px'
        }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: '32px',
            fontWeight: '800',
            marginBottom: '10px',
            background: `linear-gradient(135deg, #ffffff 0%, rgba(${100 + mousePos.x * 0.8}, ${150 + mousePos.y * 0.5}, 255, 1) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s ease'
          }}>
            {isLogin ? 'Welcome Back' : 'Join the Future'}
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '16px',
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            {isLogin ? 'Enter your digital realm' : 'Create your digital identity'}
          </p>
        </div>

        {/* Form */}
        <div>
          {/* Name field for signup */}
          {!isLogin && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                position: 'relative',
                background: 'rgba(20, 25, 40, 0.6)',
                border: '1px solid rgba(100, 150, 255, 0.2)',
                borderRadius: '16px',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.4)';
                e.currentTarget.style.background = 'rgba(25, 30, 45, 0.8)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.2)';
                e.currentTarget.style.background = 'rgba(20, 25, 40, 0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <User size={22} style={{ 
                  color: 'rgba(100, 150, 255, 0.6)', 
                  marginRight: '16px',
                  transition: 'color 0.3s ease'
                }} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontSize: '16px',
                    padding: '20px 0',
                    width: '100%',
                    fontWeight: '400'
                  }}
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              position: 'relative',
              background: 'rgba(20, 25, 40, 0.6)',
              border: '1px solid rgba(100, 150, 255, 0.2)',
              borderRadius: '16px',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.4)';
              e.currentTarget.style.background = 'rgba(25, 30, 45, 0.8)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(20, 25, 40, 0.6)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <Mail size={22} style={{ 
                color: 'rgba(100, 150, 255, 0.6)', 
                marginRight: '16px',
                transition: 'color 0.3s ease'
              }} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '16px',
                  padding: '20px 0',
                  width: '100%',
                  fontWeight: '400'
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: !isLogin ? '24px' : '35px' }}>
            <div style={{
              position: 'relative',
              background: 'rgba(20, 25, 40, 0.6)',
              border: '1px solid rgba(100, 150, 255, 0.2)',
              borderRadius: '16px',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.4)';
              e.currentTarget.style.background = 'rgba(25, 30, 45, 0.8)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(20, 25, 40, 0.6)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <Lock size={22} style={{ 
                color: 'rgba(100, 150, 255, 0.6)', 
                marginRight: '16px',
                transition: 'color 0.3s ease'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '16px',
                  padding: '20px 0',
                  width: '100%',
                  fontWeight: '400'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'rgba(100, 150, 255, 0.6)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'rgba(100, 150, 255, 1)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(100, 150, 255, 0.6)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Confirm Password field for signup */}
          {!isLogin && (
            <div style={{ marginBottom: '35px' }}>
              <div style={{
                position: 'relative',
                background: 'rgba(20, 25, 40, 0.6)',
                border: '1px solid rgba(100, 150, 255, 0.2)',
                borderRadius: '16px',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.4)';
                e.currentTarget.style.background = 'rgba(25, 30, 45, 0.8)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(100, 150, 255, 0.2)';
                e.currentTarget.style.background = 'rgba(20, 25, 40, 0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <Lock size={22} style={{ 
                  color: 'rgba(100, 150, 255, 0.6)', 
                  marginRight: '16px',
                  transition: 'color 0.3s ease'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontSize: '16px',
                    padding: '20px 0',
                    width: '100%',
                    fontWeight: '400'
                  }}
                />
              </div>
            </div>
          )}

          {/* Forgot password link for login */}
          {isLogin && (
            <div style={{ textAlign: 'right', marginBottom: '35px' }}>
              <a 
                href="#" 
                style={{
                  color: 'rgba(100, 150, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'rgba(100, 150, 255, 1)';
                  e.target.style.transform = 'translateX(-3px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'rgba(100, 150, 255, 0.7)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                Forgot Password?
              </a>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e90ff 50%, #0ea5e9 100%)',
              border: 'none',
              borderRadius: '16px',
              padding: '20px',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 12px 40px rgba(30, 144, 255, 0.25)',
              marginBottom: '35px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px) scale(1.02)';
              e.target.style.boxShadow = '0 20px 60px rgba(30, 144, 255, 0.4)';
              e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #06b6d4 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 12px 40px rgba(30, 144, 255, 0.25)';
              e.target.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e90ff 50%, #0ea5e9 100%)';
            }}
          >
            {isLogin ? 'Enter the Matrix' : 'Join the Revolution'}
            <ArrowRight size={20} style={{
              transition: 'transform 0.3s ease'
            }} />
          </button>
        </div>

        {/* Toggle between login/signup */}
        <div style={{
          textAlign: 'center',
          paddingTop: '25px',
          borderTop: '1px solid rgba(100, 150, 255, 0.1)'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '15px',
            margin: 0
          }}>
            {isLogin ? "New to the platform?" : "Already part of us?"}
            <button
              onClick={toggleMode}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(100, 150, 255, 0.8)',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                marginLeft: '10px',
                textDecoration: 'underline',
                transition: 'all 0.3s ease',
                textUnderlineOffset: '3px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'rgba(100, 150, 255, 1)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(100, 150, 255, 0.8)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      {/* CSS Animations for floating particles */}
      <style>{`
        @keyframes float0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-180deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(90deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(-90deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-22px) rotate(270deg); } }
        @keyframes float5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-16px) rotate(-270deg); } }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
          transition: color 0.3s ease;
        }
        
        input:focus::placeholder {
          color: rgba(100, 150, 255, 0.4) !important;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
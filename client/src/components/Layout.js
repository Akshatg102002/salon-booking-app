import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { Toast, Modal, Button } from './UI';

const Layout = ({ children }) => {
  const { user, logout, toast } = useAuth();
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      <style>
        {`
          .navbar {
            background-color: #fff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            position: sticky;
            top: 0;
            z-index: 50;
          }
          .nav-container {
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .nav-link {
            color: #4a5568;
            transition: color 150ms ease-in-out;
            text-decoration: none;
            font-weight: 500;
            display: block;
            padding: 0.5rem 0;
          }
          .nav-link:hover {
            color: #d12c6a;
          }
          .desktop-nav-link {
            padding: 0;
            display: inline-block;
            margin-left:10px;
            margin-right:10px;
          }
          .btn-primary {
            background-color: #d12c6a;
            color: #fff;
            border: 1px solid #d12c6a;
          }
          .btn-primary:hover {
            background-color: #b8255b;
            border-color: #b8255b;
          }
          
          .btn-outline {
            border: 1px solid #d12c6a;
            color: #d12c6a;
            background-color: transparent;
          }
          .btn-outline:hover {
            background-color: #d12c6a;
            color: #fff;
          }
          .logo {
            height: 3.5rem;
            width: auto;
            border-radius: 0.75rem;
          }
          .mobile-menu {
            position: fixed;
            top: 5rem; /* Height of navbar */
            right: 0;
            width: 280px;
            height: calc(100vh - 5rem);
            background-color: #fff;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            z-index: 40;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
          }
          .mobile-menu.open {
            transform: translateX(0);
          }
          .mobile-overlay {
            position: fixed;
            top: 5rem;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 30;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
          }
          .mobile-overlay.open {
            opacity: 1;
            visibility: visible;
          }
          .hamburger {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            padding: 0.5rem;
            border: none;
            background: none;
            z-index: 51;
            position: relative;
          }
          .hamburger span {
            width: 25px;
            height: 3px;
            background-color: #4a5568;
            margin: 3px 0;
            transition: 0.3s;
            border-radius: 2px;
          }
          .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
          }
          .hamburger.active span:nth-child(2) {
            opacity: 0;
          }
          .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
          }
          
          /* Hide mobile menu on desktop */
          @media (min-width: 769px) {
            .mobile-menu,
            .mobile-overlay,
            .hamburger {
              display: none !important;
            }
          }
          
          /* Mobile styles */
          @media (max-width: 768px) {
            .mobile-menu-btn {
              width: 100%;
              margin: 0.5rem 0;
              justify-content: center;
            }
            .desktop-nav {
              display: none !important;
            }
          }
        `}
      </style>
      
      <nav className="navbar">
        <div className="nav-container">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0" onClick={closeMobileMenu}>
                <img
                  src="https://tan-tarsier-675415.hostingersite.com/wp-content/uploads/2025/05/cropped-logo-1.png"
                  alt="Karmi Beauty Logo"
                  className="logo"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="desktop-nav hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <span className="text-gray-600 font-medium">Hello, {user.name}</span>
                  {user.role === 'customer' && (
                    <>
                      <Link to="/booking" className="nav-link desktop-nav-link">Book Now</Link>
                      <Link to="/my-bookings" className="nav-link desktop-nav-link">My Bookings</Link>
                    </>
                  )}
                  {user.role === 'staff' && (
                    <Link to="/staff-dashboard" className="nav-link desktop-nav-link">My Appointments</Link>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin-dashboard" className="nav-link desktop-nav-link">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="btn btn-secondary" style={{padding: '0.5rem',
  borderRadius: '0.5rem',
  fontWeight: 600,
  transition: 'background-color 150ms ease-in-out, color 150ms ease-in-out, border-color 150ms ease-in-out',
  textDecoration: 'none',
  cursor: 'pointer',
  border: 'none',
  display: 'inline-block',
  textAlign: 'center'}}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link desktop-nav-link">Login</Link>
                  <Link to="/register" className="btn btn-primary">Sign Up</Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              className={`hamburger md:hidden ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu md:hidden ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="flex flex-col p-6 space-y-4">
            {user ? (
              <>
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <span className="text-gray-600 font-medium text-lg">Hello, {user.name}</span>
                </div>
                
                {user.role === 'customer' && (
                  <>
                    <Link 
                      to="/booking" 
                      className="nav-link text-lg border-b border-gray-100 pb-3" 
                      onClick={closeMobileMenu}
                    >
                      Book Now
                    </Link>
                    <Link 
                      to="/my-bookings" 
                      className="nav-link text-lg border-b border-gray-100 pb-3" 
                      onClick={closeMobileMenu}
                    >
                      My Bookings
                    </Link>
                  </>
                )}
                
                {user.role === 'staff' && (
                  <Link 
                    to="/staff-dashboard" 
                    className="nav-link text-lg border-b border-gray-100 pb-3" 
                    onClick={closeMobileMenu}
                  >
                    My Appointments
                  </Link>
                )}
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin-dashboard" 
                    className="nav-link text-lg border-b border-gray-100 pb-3" 
                    onClick={closeMobileMenu}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary mobile-menu-btn mt-6"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="nav-link text-lg border-b border-gray-100 pb-3" 
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary mobile-menu-btn mt-4" 
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div 
          className={`mobile-overlay md:hidden ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={closeMobileMenu}
        />
      </nav>
      
      <main className="pb-16">{children}</main>
      
      {toast && <Toast {...toast} />}
      
      <Modal isOpen={showLocationModal} onClose={() => setShowLocationModal(false)} title="Salon Location">
        <div className="p-4">
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">📍 Karmi Beauty Salon</h4>
            <p className="text-gray-600 mb-4">Jamaica Avenue, New York, NY</p>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="font-semibold mb-1">📞 Phone</h5>
                <p className="text-gray-600">Call for appointments</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="font-semibold mb-1">🕒 Hours</h5>
                <p className="text-gray-600">Mon-Sat: 9AM-7PM<br/>Sun: 10AM-6PM</p>
              </div>
            </div>
          </div>
          
          <div className="map-container mb-4 rounded-xl overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.7270998222075!2d-73.81000842397484!3d40.70200757139506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac8cd6013ce57bdf%3A0x37b8568e562fb79!2sKarmi%20Beauty%20Salon!5e0!3m2!1sen!2sin!4v1754114341532!5m2!1sen!2sin"
              width="100%" 
              height="300" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Karmi Beauty Salon Location"
            />
          </div>
          
          <Button 
            className="w-full bg-pink-500 text-white hover:bg-pink-600"
            onClick={() => window.open('https://maps.google.com/?q=Karmi+Beauty+Salon', '_blank')}
          >
            Get Directions
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;
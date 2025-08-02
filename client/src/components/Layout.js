import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { Toast, Modal,Button } from './UI';

const Layout = ({ children }) => {
  const { user, logout, toast } = useAuth();
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
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
          }
          .nav-link:hover {
            color: #d12c6a;
          }
          .btn {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: background-color 150ms ease-in-out, color 150ms ease-in-out, border-color 150ms ease-in-out;
            text-decoration: none;
            cursor: pointer;
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
        `}
      </style>
      <nav className="navbar">
        <div className="nav-container">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img
                  src="https://tan-tarsier-675415.hostingersite.com/wp-content/uploads/2025/05/cropped-logo-1.png"
                  alt="Karmi Beauty Logo"
                  className="logo"
                />
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <span className="text-gray-600 font-medium">Hello, {user.name}</span>
                  {user.role === 'customer' && (
                    <>
                      <Link to="/booking" className="nav-link">Book Now</Link>
                      <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                    </>
                  )}
                  {user.role === 'staff' && (
                    <Link to="/staff-dashboard" className="nav-link">My Appointments</Link>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="btn btn-primary">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
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

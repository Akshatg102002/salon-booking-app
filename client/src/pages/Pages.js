import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AppContext';
import { Card, Button, Modal, Input, Select } from '../components/UI';
import { MultiStepBooking } from '../components/Booking';
import { Login, Register } from '../components/Auth';

export { Login, Register };

export const Home = () => {
  const { user } = useAuth();
  const [showLocationModal, setShowLocationModal] = useState(false);

  const services = [
    {
      icon: '✂️',
      title: 'Hair Services',
      description: 'Professional hair cutting, styling and coloring services',
      price: 'Starting from $35'
    },
    {
      icon: '💅',
      title: 'Nail Care',
      description: 'Manicure and pedicure services for beautiful nails',
      price: 'Starting from $25'
    },
    {
      icon: '✨',
      title: 'Facial Treatments',
      description: 'Rejuvenating facial treatments for glowing skin',
      price: 'Starting from $50'
    },
    {
      icon: '👁️',
      title: 'Eyelash Extensions',
      description: 'Beautiful, natural-looking lash enhancements',
      price: 'Starting from $80'
    }
  ];

  const testimonials = [
    {
      text: "I'm thrilled with my new look thanks to Karmi Beauty Salon! Raj made me feel at home from the moment I arrived, and the final result exceeded all my expectations.",
      author: "Sarah Johnson"
    },
    {
      text: "They are amazing! Such a great job. They go above and beyond to make sure you leave happy! I loved my hair, nails and my toes!",
      author: "Maria Rodriguez"
    },
    {
      text: "Best salon experience ever! The team at Karmi Beauty is exceptional. They really listen to what you want and offer great advice.",
      author: "Jennifer Lee"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="hero-banner">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Karmi Beauty</h1>
            <p className="hero-subtitle">
              Where beauty meets excellence. Professional salon services in the heart of New York.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              {user ? (
                <Link to="/booking" className="btn btn-secondary">
                  Book Your Appointment
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-secondary">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Satisfied Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Services</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Expert Staff</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">Our Premium Services</h2>
            <p className="text-lg text-light max-w-2xl mx-auto">
              Experience the finest beauty treatments with our skilled professionals using premium products
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <p className="service-price">{service.price}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark mb-6">
                Beauty is an Art, You are the Masterpiece
              </h2>
              <p className="text-light mb-6 text-lg leading-relaxed">
                At Karmi Beauty, we believe that every individual is unique, and so are their beauty needs. 
                Our salon is a sanctuary where you can escape the hustle and bustle of daily life and 
                indulge in a world of relaxation and rejuvenation.
              </p>
              <p className="text-light mb-8 text-lg leading-relaxed">
                We are committed to using high-quality products and the latest techniques to ensure 
                that you receive the best possible treatment. Our team consists of highly trained 
                professionals who are passionate about beauty and dedicated to excellence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-gold mb-2">15+</div>
                <div className="text-sm text-light">Years Experience</div>
              </div>
              <div className="bg-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-gold mb-2">20+</div>
                <div className="text-sm text-light">Services</div>
              </div>
              <div className="bg-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-gold mb-2">500+</div>
                <div className="text-sm text-light">Happy Clients</div>
              </div>
              <div className="bg-white p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-gold mb-2">10+</div>
                <div className="text-sm text-light">Expert Staff</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">What Our Clients Say</h2>
            <p className="text-lg text-light">Real experiences from our valued customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocationSection />

      <button 
        className="location-btn"
        onClick={() => setShowLocationModal(true)}
        title="View Location"
      >
        📍
      </button>

      <LocationModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </div>
  );
};

const LocationSection = () => (
  <section className="location-section">
    <div className="container">
      <div className="location-content">
        <div className="location-info">
          <h3>Visit Our Salon</h3>
          <div className="location-details">
            <h4 className="font-semibold text-lg mb-2">📍 Address</h4>
            <p className="text-light mb-4">Jamaica Avenue, New York, NY</p>
            
            <h4 className="font-semibold text-lg mb-2">📞 Contact</h4>
            <p className="text-light mb-4">Call us to book your appointment</p>
            
            <h4 className="font-semibold text-lg mb-2">🕒 Hours</h4>
            <p className="text-light">Mon-Sat: 9AM-7PM | Sun: 10AM-6PM</p>
          </div>
        </div>
        
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.7270998222075!2d-73.81000842397484!3d40.70200757139506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac8cd6013ce57bdf%3A0x37b8568e562fb79!2sKarmi%20Beauty%20Salon!5e0!3m2!1sen!2sin!4v1754114341532!5m2!1sen!2sin"
            width="100%" 
            height="400" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Karmi Beauty Salon Location"
          />
        </div>
      </div>
    </div>
  </section>
);

const LocationModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Salon Location">
    <div className="p-4">
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-2">📍 Karmi Beauty Salon</h4>
        <p className="text-light mb-4">Jamaica Avenue, New York, NY</p>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-cream p-4 rounded-lg">
            <h5 className="font-semibold mb-1">📞 Phone</h5>
            <p className="text-light">Call for appointments</p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <h5 className="font-semibold mb-1">🕒 Hours</h5>
            <p className="text-light">Mon-Sat: 9AM-7PM<br/>Sun: 10AM-6PM</p>
          </div>
        </div>
      </div>
      
      <div className="map-container mb-4">
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
      
      <button 
        className="btn btn-primary w-full"
        onClick={() => window.open('https://maps.google.com/?q=Karmi+Beauty+Salon', '_blank')}
      >
        Get Directions
      </button>
    </div>
  </Modal>
);

export const Booking = () => {
    return <MultiStepBooking />;
};

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { showToast } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      showToast('Failed to load bookings', 'error');
    }
    setLoading(false);
  };

  const cancelBooking = async (bookingId) => {
    try {
      await api.patch(`/bookings/${bookingId}/cancel`);
      showToast('Booking cancelled successfully', 'success');
      fetchBookings();
    } catch (error) {
      showToast('Failed to cancel booking', 'error');
    }
  };

  if (loading) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p className="text-light mt-4">Loading your bookings...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">My Bookings</h1>
            <p className="text-light">Manage your appointments at Karmi Beauty</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowLocationModal(true)}
              className="btn btn-secondary flex items-center gap-2"
            >
              <span>📍</span>
              Salon Location
            </button>
            <Link to="/booking" className="btn btn-primary flex items-center gap-2">
              <span>✨</span>
              Book New Appointment
            </Link>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="card text-center py-16">
            <div className="service-icon mx-auto mb-6">
              📅
            </div>
            <h3 className="text-2xl font-semibold text-dark mb-4">No Bookings Yet</h3>
            <p className="text-light mb-8 max-w-md mx-auto">
              You haven't made any appointments yet. Book your first appointment and experience 
              the luxury of Karmi Beauty.
            </p>
            <Link to="/booking" className="btn btn-primary">
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.filter(booking => 
              booking.status === 'confirmed' && new Date(booking.date) >= new Date()
            ).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                  <span className="text-gold">🕒</span>
                  Upcoming Appointments
                </h2>
                <div className="grid gap-4">
                  {bookings
                    .filter(booking => 
                      booking.status === 'confirmed' && new Date(booking.date) >= new Date()
                    )
                    .map(booking => (
                      <BookingCard 
                        key={booking._id} 
                        booking={booking} 
                        onCancel={cancelBooking}
                        isUpcoming={true}
                      />
                    ))
                  }
                </div>
              </div>
            )}

            {bookings.filter(booking => 
              booking.status !== 'confirmed' || new Date(booking.date) < new Date()
            ).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                  <span className="text-gold">📋</span>
                  Booking History
                </h2>
                <div className="grid gap-4">
                  {bookings
                    .filter(booking => 
                      booking.status !== 'confirmed' || new Date(booking.date) < new Date()
                    )
                    .slice(0, 10)
                    .map(booking => (
                      <BookingCard 
                        key={booking._id} 
                        booking={booking} 
                        onCancel={cancelBooking}
                        isUpcoming={false}
                      />
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        )}

        <Modal isOpen={showLocationModal} onClose={() => setShowLocationModal(false)} title="Visit Our Salon">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="service-icon mx-auto mb-4">
                📍
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">Karmi Beauty Salon</h3>
              <p className="text-light">Your beauty destination in New York</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-cream p-4 rounded-lg">
                <h5 className="font-semibold text-dark mb-2 flex items-center gap-2">
                  <span>📍</span>
                  Address
                </h5>
                <p className="text-light">Jamaica Avenue, New York, NY</p>
              </div>
              
              <div className="bg-cream p-4 rounded-lg">
                <h5 className="font-semibold text-dark mb-2 flex items-center gap-2">
                  <span>📞</span>
                  Contact
                </h5>
                <p className="text-light">Call us to book your appointment</p>
              </div>
              
              <div className="bg-cream p-4 rounded-lg">
                <h5 className="font-semibold text-dark mb-2 flex items-center gap-2">
                  <span>🕒</span>
                  Business Hours
                </h5>
                <div className="text-light text-sm">
                  <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="map-container mb-6" style={{borderRadius: '15px', overflow: 'hidden'}}>
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
            
            <div className="flex gap-3">
              <button 
                className="btn btn-secondary flex-1"
                onClick={() => window.open('tel:', '_self')}
              >
                📞 Call Salon
              </button>
              <button 
                className="btn btn-primary flex-1"
                onClick={() => window.open('https://maps.google.com/?q=Karmi+Beauty+Salon', '_blank')}
              >
                🗺️ Get Directions
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const BookingCard = ({ booking, onCancel, isUpcoming }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { class: 'badge-success', icon: '✅', text: 'Confirmed' },
      cancelled: { class: 'badge-error', icon: '❌', text: 'Cancelled' },
      completed: { class: 'badge-info', icon: '✨', text: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig.confirmed;
    
    return (
      <span className={`badge ${config.class} flex items-center gap-1`}>
        <span>{config.icon}</span>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`card ${isUpcoming ? 'border-l-4 border-l-gold' : ''}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h3 className="text-xl font-semibold text-dark">
              {booking.service?.name || 'Service Unavailable'} - {booking.subCategory || 'N/A'}
            </h3>
            {getStatusBadge(booking.status)}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-light">
                <span>👤</span>
                <span>Stylist: {booking.staff?.name || 'Staff Unavailable'}</span>
              </div>
              <div className="flex items-center gap-2 text-light">
                <span>📅</span>
                <span>{booking.date ? formatDate(booking.date) : 'Date Unavailable'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-light">
                <span>🕒</span>
                <span>
                  {booking.startTime ? formatTime(booking.startTime) : 'Time Unavailable'}
                  {booking.endTime && ` - ${formatTime(booking.endTime)}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>💰</span>
                <span className="font-semibold text-gold text-lg">
                  ${booking.price || '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          {booking.status === 'confirmed' && booking.date && new Date(booking.date) > new Date() && (
            <>
              <button
                onClick={() => onCancel(booking._id)}
                className="btn btn-outline text-error border-error hover:bg-error hover:text-white px-4 py-2"
              >
                Cancel Booking
              </button>
              <Link 
                to="/booking" 
                className="btn btn-secondary px-4 py-2"
              >
                Reschedule
              </Link>
            </>
          )}
          
          {booking.status === 'completed' && (
            <button className="btn btn-primary px-4 py-2">
              Book Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export const StaffDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useAuth();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('/bookings/staff-appointments');
            setAppointments(response.data);
        } catch (error) {
            showToast('Failed to load appointments', 'error');
        }
        setLoading(false);
    };

    const markAsCompleted = async (bookingId) => {
        try {
            await api.patch(`/bookings/${bookingId}`, { status: 'completed' });
            showToast('Appointment marked as completed', 'success');
            fetchAppointments();
        } catch (error) {
            showToast('Failed to update appointment', 'error');
        }
    };

    if (loading) return <div className="text-center py-8">Loading your appointments...</div>;

    const upcomingAppointments = appointments.filter(apt =>
        apt.status === 'confirmed' && new Date(apt.date) >= new Date()
    );
    const pastAppointments = appointments.filter(apt =>
        apt.status === 'completed' || new Date(apt.date) < new Date()
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Appointments</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                {upcomingAppointments.length === 0 ? (
                    <Card>
                        <p className="text-gray-600">No upcoming appointments.</p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {upcomingAppointments.map(appointment => (
                            <Card key={appointment._id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {appointment.service.name} - {appointment.subCategory}
                                        </h3>
                                        <p className="text-gray-600">Client: {appointment.customer.name}</p>
                                        <p className="text-gray-600">Phone: {appointment.customer.phone}</p>
                                        <p className="text-gray-600">
                                            {new Date(appointment.date).toLocaleDateString()} at {appointment.startTime}
                                        </p>
                                        <p className="text-purple-600 font-semibold">${appointment.price}</p>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => markAsCompleted(appointment._id)}
                                    >
                                        Mark Complete
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
                {pastAppointments.length === 0 ? (
                    <Card>
                        <p className="text-gray-600">No past appointments.</p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {pastAppointments.slice(0, 10).map(appointment => (
                            <Card key={appointment._id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {appointment.service.name} - {appointment.subCategory}
                                        </h3>
                                        <p className="text-gray-600">Client: {appointment.customer.name}</p>
                                        <p className="text-gray-600">
                                            {new Date(appointment.date).toLocaleDateString()} at {appointment.startTime}
                                        </p>
                                        <p className="text-purple-600 font-semibold">${appointment.price}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showStaffModal, setShowStaffModal] = useState(false);
    const { showToast } = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [bookingsRes, servicesRes, staffRes] = await Promise.all([
                api.get('/bookings/all'),
                api.get('/services'),
                api.get('/staff')
            ]);
            setBookings(bookingsRes.data);
            setServices(servicesRes.data);
            setStaff(staffRes.data);
        } catch (error) {
            showToast('Failed to load data', 'error');
        }
        setLoading(false);
    };

    const cancelBooking = async (bookingId) => {
        try {
            await api.patch(`/bookings/${bookingId}/cancel`);
            showToast('Booking cancelled successfully', 'success');
            fetchData();
        } catch (error) {
            showToast('Failed to cancel booking', 'error');
        }
    };

    if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'confirmed':
                return 'badge-confirmed';
            case 'cancelled':
                return 'badge-cancelled';
            case 'completed':
                return 'badge-completed';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const serviceNameById = (id) => services.find(s => s._id === id)?.name || 'Service Unavailable';
    const staffNameById = (id) => staff.find(s => s._id === id)?.name || 'Staff Unavailable';

    return (
        <div className="admin-dashboard-container bg-white p-8 rounded-xl shadow-lg">
            <style>
              {`
                .admin-dashboard-container {
                  max-width: 1280px;
                  margin: 0 auto;
                }
                .tab-navigation {
                  display: flex;
                  gap: 0.25rem; /* space-x-1 */
                  margin-bottom: 1.5rem; /* mb-6 */
                  background-color: #f3f4f6; /* gray-100 */
                  padding: 0.25rem; /* p-1 */
                  border-radius: 0.5rem; /* rounded-lg */
                }
                .tab-button {
                  flex: 1;
                  padding: 0.75rem 1rem;
                  border-radius: 0.375rem;
                  transition: all 0.3s ease-in-out;
                  font-weight: 600;
                  text-align: center;
                  background-color: transparent;
                  color: #4b5563; /* gray-600 */
                  border: 1px solid transparent;
                }
                .tab-button:hover {
                  color: #1f2937; /* gray-900 */
                }
                .tab-button.active {
                  color: #ec4899; /* pink-500 */
                  background-color: #fff;
                  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                  border-color: #ec4899;
                }
                .card-grid {
                  display: grid;
                  gap: 1rem;
                }
                .booking-card {
                  background-color: #fff;
                  padding: 1.5rem;
                  border-radius: 0.75rem;
                  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                }
                .booking-status-badge {
                  padding: 0.25rem 0.75rem;
                  border-radius: 9999px;
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                  font-weight: 500;
                }
                .badge-confirmed {
                  background-color: #dcfce7; /* green-100 */
                  color: #166534; /* green-800 */
                  margin-bottom:10px;
                }
                .badge-cancelled {
                  background-color: #fee2e2; /* red-100 */
                  color: #991b1b; /* red-800 */
                }
                .badge-completed {
                  background-color: #e0e7ff; /* indigo-100 */
                  color: #3730a3; /* indigo-800 */
                }
                .modal-button-primary {
                  background-color: #ec4899;
                  color: #fff;
                  padding: 0.5rem 1rem;
                  border-radius: 0.5rem;
                  font-weight: 600;
                  transition: background-color 0.3s;
                }
                .modal-button-primary:hover {
                  background-color: #d12c6a;
                }
                .modal-button-danger {
                  background-color: #ef4444; /* red-500 */
                  color: #fff;
                  padding: 0.5rem 1rem;
                  border-radius: 0.5rem;
                  font-weight: 600;
                  transition: background-color 0.3s;
                }
                .modal-button-danger:hover {
                  background-color: #dc2626; /* red-600 */
                }
                .staff-profile-img {
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  object-fit: cover;
                  margin-right: 1.5rem;
                }
              `}
            </style>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

            <div className="tab-navigation">
                {[
                    { key: 'bookings', label: 'All Bookings' },
                    { key: 'services', label: 'Services' },
                    { key: 'staff', label: 'Staff Management' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'bookings' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">All Bookings</h2>
                        <div className="text-sm text-gray-600">
                            Total: {bookings.length} bookings
                        </div>
                    </div>
                    <div className="space-y-4">
                        {bookings.map(booking => (
                            <Card key={booking._id} className="booking-card">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                {booking.service?.name || 'Service Unavailable'} - {booking.subCategory || 'N/A'}
                                            </h3>
                                            <p className="text-sm text-gray-600">Customer: {booking.customer?.name || 'Customer Unavailable'}</p>
                                            <p className="text-sm text-gray-600">Email: {booking.customer?.email || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Phone: {booking.customer?.phone || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Staff: {booking.staff?.name || 'Staff Unavailable'}</p>
                                            <p className="text-sm text-gray-600">Date: {booking.date ? new Date(booking.date).toLocaleDateString() : 'Date Unavailable'}</p>
                                            <p className="text-sm text-gray-600">Time: {booking.startTime || 'N/A'} - {booking.endTime || 'N/A'}</p>
                                            <p className="text-pink-600 font-semibold mt-1">${booking.price || '0.00'}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-2">
                                        <span className={`booking-status-badge ${getStatusBadgeClass(booking.status)}`}>
                                            {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Unknown'}
                                        </span>
                                        {booking.status === 'confirmed' && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => cancelBooking(booking._id)}
                                                className="modal-button-danger"
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'services' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Services Management</h2>
                        <Button onClick={() => setShowServiceModal(true)} className="modal-button-primary">Add Service</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map(service => (
                            <Card key={service._id} className="booking-card">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm text-gray-700">Sub-categories:</h4>
                                    {service.subCategories.map((sub, index) => (
                                        <div key={index} className="text-sm bg-gray-50 p-2 rounded-lg">
                                            <div className="flex justify-between">
                                                <span>{sub.name}</span>
                                                <span className="text-pink-600 font-medium">${sub.price}</span>
                                            </div>
                                            <span className="text-gray-500">{sub.duration} mins</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'staff' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Staff Management</h2>
                        <Button onClick={() => setShowStaffModal(true)} className="modal-button-primary">Add Staff Member</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {staff.map(member => (
                            <Card key={member._id} className="booking-card">
                                <div className="flex items-center">
                                    <img 
                                        src={member.profileImage || `https://placehold.co/100x100/e5e7eb/4b5563?text=${member.name.charAt(0)}`}
                                        alt={member.name}
                                        className="staff-profile-img"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{member.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{member.email}</p>
                                        <p className="text-gray-600 text-sm mb-3">{member.phone}</p>
                                        <div>
                                            <h4 className="font-medium text-sm text-gray-700 mb-2">Assigned Services:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {member.staffInfo?.services?.length > 0 ? (
                                                    member.staffInfo.services.map((service, index) => (
                                                        <span key={index} className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">
                                                            {service.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 text-xs">No services assigned</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            <ServiceModal
                isOpen={showServiceModal}
                onClose={() => setShowServiceModal(false)}
                onSave={fetchData}
            />

            <StaffModal
                isOpen={showStaffModal}
                onClose={() => setShowStaffModal(false)}
                onSave={fetchData}
                services={services}
            />
        </div>
    );
};

const ServiceModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        subCategories: [{ name: '', duration: '', price: '' }]
    });
    const { showToast } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/services', formData);
            showToast('Service created successfully', 'success');
            onSave();
            onClose();
            setFormData({
                name: '',
                description: '',
                category: '',
                subCategories: [{ name: '', duration: '', price: '' }]
            });
        } catch (error) {
            showToast('Failed to create service', 'error');
        }
    };

    const addSubCategory = () => {
        setFormData({
            ...formData,
            subCategories: [...formData.subCategories, { name: '', duration: '', price: '' }]
        });
    };

    const updateSubCategory = (index, field, value) => {
        const newSubCategories = [...formData.subCategories];
        newSubCategories[index][field] = value;
        setFormData({ ...formData, subCategories: newSubCategories });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Service">
            <form onSubmit={handleSubmit} className="p-4">
                <Input
                    label="Service Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <Input
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <Input
                    label="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                />

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub-categories
                    </label>
                    {formData.subCategories.map((sub, index) => (
                        <div key={index} className="border border-gray-300 p-3 rounded-lg mb-2">
                            <div className="grid grid-cols-3 gap-2">
                                <Input
                                    label="Name"
                                    value={sub.name}
                                    onChange={(e) => updateSubCategory(index, 'name', e.target.value)}
                                    required
                                />
                                <Input
                                    label="Duration (min)"
                                    type="number"
                                    value={sub.duration}
                                    onChange={(e) => updateSubCategory(index, 'duration', parseInt(e.target.value))}
                                    required
                                />
                                <Input
                                    label="Price ($)"
                                    type="number"
                                    value={sub.price}
                                    onChange={(e) => updateSubCategory(index, 'price', parseFloat(e.target.value))}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addSubCategory} className="modal-button-outline">
                        Add Sub-category
                    </Button>
                </div>

                <div className="flex justify-end space-x-2">
                    <Button type="button" onClick={onClose} className="modal-button-primary">Cancel</Button>
                    <Button type="submit" className="btn-primary" style={{marginLeft:'10px'}}>Create Service</Button>
                </div>
            </form>
        </Modal>
    );
};

const StaffModal = ({ isOpen, onClose, onSave, services }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: '',
    services: [],
    workingHours: {
      startTime: '09:00',
      endTime: '18:00',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }
  });
  const { showToast } = useAuth();

  React.useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        profileImage: '',
        services: [],
        workingHours: {
          startTime: '09:00',
          endTime: '18:00',
          workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        }
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      profileImage: '',
      services: [],
      workingHours: {
        startTime: '09:00',
        endTime: '18:00',
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      }
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/staff/profile', formData);
      showToast('Staff member created successfully', 'success');
      onSave();
      handleClose();
    } catch (error) {
      showToast('Failed to create staff member', 'error');
    }
  };

  const handleWorkingDayChange = (day, isChecked) => {
    const updatedDays = isChecked
      ? [...formData.workingHours.workingDays, day]
      : formData.workingHours.workingDays.filter(d => d !== day);
    
    setFormData({
      ...formData,
      workingHours: { ...formData.workingHours, workingDays: updatedDays }
    });
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Staff Member">
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <Input
          label="Full Name *"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        
        <Input
          label="Email (Optional)"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        
        <Input
          label="Phone (Optional)"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />

        <Input
          label="Profile Image URL (Optional)"
          value={formData.profileImage}
          onChange={(e) => setFormData({...formData, profileImage: e.target.value})}
        />
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Working Hours</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              label="Start Time"
              type="time"
              value={formData.workingHours.startTime}
              onChange={(e) => setFormData({
                ...formData,
                workingHours: { ...formData.workingHours, startTime: e.target.value }
              })}
              required
            />
            
            <Input
              label="End Time"
              type="time"
              value={formData.workingHours.endTime}
              onChange={(e) => setFormData({
                ...formData,
                workingHours: { ...formData.workingHours, endTime: e.target.value }
              })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Days
            </label>
            <div className="grid grid-cols-2 gap-2">
              {daysOfWeek.map(day => (
                <label key={day.key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.workingHours.workingDays.includes(day.key)}
                    onChange={(e) => handleWorkingDayChange(day.key, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">{day.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign Services *
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded p-3">
            {services.map(service => (
              <label key={service._id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service._id)}
                  onChange={(e) => {
                    const selectedServices = e.target.checked
                      ? [...formData.services, service._id]
                      : formData.services.filter(id => id !== service._id);
                    setFormData({ ...formData, services: selectedServices });
                  }}
                  className="mr-2"
                />
                <span className="text-sm">{service.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            onClick={handleClose}
            className="modal-button-primary"
          >
            Cancel
          </Button>
          <Button type="submit"  className="btn-primary" style={{marginLeft:'10px',padding:'10px'}}>Add Staff Member</Button>
        </div>
      </form>
    </Modal>
  );
};
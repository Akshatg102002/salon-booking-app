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

          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6 our-premium">
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
            style={{ border: 0 }}
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
            <p className="text-light">Mon-Sat: 9AM-7PM<br />Sun: 10AM-6PM</p>
          </div>
        </div>
      </div>

      <div className="map-container mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.7270998222075!2d-73.81000842397484!3d40.70200757139506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac8cd6013ce57bdf%3A0x37b8568e562fb79!2sKarmi%20Beauty%20Salon!5e0!3m2!1sen!2sin!4v1754114341532!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
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

            <div className="map-container mb-6" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.7270998222075!2d-73.81000842397484!3d40.70200757139506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac8cd6013ce57bdf%3A0x37b8568e562fb79!2sKarmi%20Beauty%20Salon!5e0!3m2!1sen!2sin!4v1754114341532!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
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
  const [activeTab, setActiveTab] = useState('calendar');
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
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
      showToast('Failed to load dashboard data', 'error');
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

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  if (loading) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p className="text-light mt-4">Loading dashboard...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container py-8">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-2">Admin Dashboard</h1>
            <p className="text-light">Manage your salon operations</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowServiceModal(true)}
              className="btn btn-secondary"
            >
              ➕ Add Service
            </button>
            <button
              onClick={() => setShowStaffModal(true)}
              className="btn btn-primary"
            >
              👥 Add Staff
            </button>
          </div>
        </div>

        {/* Statistics Overview */}
        <AdminStats bookings={bookings} />

        {/* Tab Navigation */}
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendar View
          </button>
          <button
            className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            📋 All Bookings
          </button>
          <button
            className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            ✨ Services
          </button>
          <button
            className={`tab-button ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            👥 Staff Management
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'calendar' && (
          <div className="calendar-dashboard-layout">
            <div className="calendar-main">
              <AdminCalendar
                bookings={bookings}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>
            <div className="calendar-sidebar">
              <BookingDetailsPanel
                selectedDate={selectedDate}
                bookings={bookings}
              />
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark">All Bookings</h2>
              <div className="text-sm text-light bg-white px-3 py-2 rounded-lg">
                Total: {bookings.length} bookings
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="card text-center py-16">
                <div className="service-icon mx-auto mb-6">
                  📋
                </div>
                <h3 className="text-2xl font-semibold text-dark mb-4">No Bookings Yet</h3>
                <p className="text-light mb-8 max-w-md mx-auto">
                  No appointments have been made yet. They will appear here as customers book services.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="card">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                          <h3 className="text-xl font-semibold text-dark">
                            {booking.service?.name || 'Service Unavailable'} - {booking.subCategory || 'N/A'}
                          </h3>
                          <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' :
                            booking.status === 'cancelled' ? 'badge-error' :
                              'badge-info'
                            }`}>
                            {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Unknown'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-light">
                              <span>👤</span>
                              <span>Customer: {booking.customer?.name || 'Customer Unavailable'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-light">
                              <span>✉️</span>
                              <span>Email: {booking.customer?.email || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-light">
                              <span>📞</span>
                              <span>Phone: {booking.customer?.phone || 'N/A'}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-light">
                              <span>💇‍♀️</span>
                              <span>Staff: {booking.staff?.name || 'Staff Unavailable'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-light">
                              <span>📅</span>
                              <span>
                                {booking.date ? new Date(booking.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }) : 'Date Unavailable'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-light">
                              <span>🕒</span>
                              <span>
                                {booking.startTime || 'Time Unavailable'}
                                {booking.endTime && ` - ${booking.endTime}`}
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

                      <div className="flex gap-2">
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="btn btn-outline text-error border-error hover:bg-error hover:text-white"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="tab-content fade-in">
            <div className="section-header">
              <h2>Services Management</h2>
              <button
                onClick={() => setShowServiceModal(true)}
                className="btn btn-primary"
              >
                ➕ Add New Service
              </button>
            </div>

            {services.length === 0 ? (
              <div className="empty-state-container">
                <div className="service-icon">✨</div>
                <h3>No Services Added</h3>
                <p>Add your first service to start accepting bookings from customers.</p>
                <button
                  onClick={() => setShowServiceModal(true)}
                  className="btn btn-primary"
                >
                  Add Your First Service
                </button>
              </div>
            ) : (
              <div className="services-management-grid">
                {services.map(service => (
                  <div key={service._id} className="service-category slide-in-left">
                    <div className="service-category-header">
                      <h3>{service.name}</h3>
                      {service.description && (
                        <p className="text-sm opacity-90 mt-1">{service.description}</p>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="mb-3">
                        <span className="text-sm text-light">Category: </span>
                        <span className="font-medium">{service.category}</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-dark">Sub-categories:</h4>
                        {service.subCategories.map((sub, index) => (
                          <div key={index} className="bg-cream">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{sub.name}</span>
                              <div className="flex gap-2">
                                <span className="text-light text-sm">{sub.duration}min</span>
                                <span className="font-semibold text-gold">${sub.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="tab-content fade-in">
            <div className="section-header">
              <h2>Staff Management</h2>
              <button
                onClick={() => setShowStaffModal(true)}
                className="btn btn-primary"
              >
                👥 Add Staff Member
              </button>
            </div>

            {staff.length === 0 ? (
              <div className="empty-state-container">
                <div className="service-icon">👥</div>
                <h3>No Staff Members</h3>
                <p>Add staff members to your salon so customers can select their preferred stylist.</p>
                <button
                  onClick={() => setShowStaffModal(true)}
                  className="btn btn-primary"
                >
                  Add Your First Staff Member
                </button>
              </div>
            ) : (
              <div className="staff-management-grid">
                {staff.map(member => (
                  <div key={member._id} className="staff-card slide-in-left">
                    <div className="staff-avatar">
                      {member.profileImage ? (
                        <img
                          src={`https://salon-booking-app-yv82.onrender.com${member.profileImage}`}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        member.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <h3>{member.name}</h3>
                    {member.email && (
                      <p className="text-light">{member.email}</p>
                    )}
                    {member.phone && (
                      <p className="text-light">{member.phone}</p>
                    )}

                    <div className="staff-services-list">
                      <h4>Assigned Services:</h4>
                      {member.services?.length > 0 ? (
                        <div>
                          {member.services.map((service, index) => (
                            <span key={index} className="staff-service-tag">
                              {service.name || 'Service'}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-light text-sm">No services assigned</p>
                      )}
                    </div>

                    {member.workingHours && (
                      <div className="staff-working-hours">
                        <h4>Working Hours:</h4>
                        <p>
                          {member.workingHours.startTime || '9:00'} - {member.workingHours.endTime || '18:00'}
                        </p>
                        {member.workingHours.workingDays && (
                          <p className="mt-1">
                            {member.workingHours.workingDays.join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* Modals */}
        <ServiceModal
          isOpen={showServiceModal}
          onClose={() => setShowServiceModal(false)}
          onSave={() => {
            fetchData();
            setShowServiceModal(false);
          }}
        />

        <StaffModal
          isOpen={showStaffModal}
          onClose={() => setShowStaffModal(false)}
          onSave={() => {
            fetchData();
            setShowStaffModal(false);
          }}
          services={services}
        />
      </div>
    </div>
  );
};

// Statistics Component
const AdminStats = ({ bookings }) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const todayBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate.toDateString() === new Date().toDateString();
  });

  const weekBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
  });

  const monthBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= startOfMonth;
  });

  const totalRevenue = monthBookings.reduce((sum, booking) => {
    return sum + (booking.price || 0);
  }, 0);

  return (
    <div className="admin-stats-grid">
      <div className="stat-card today">
        <div className="stat-icon">📅</div>
        <div className="stat-info">
          <div className="stat-value">{todayBookings.length}</div>
          <div className="stat-label">Today's Bookings</div>
        </div>
      </div>

      <div className="stat-card week">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <div className="stat-value">{weekBookings.length}</div>
          <div className="stat-label">This Week</div>
        </div>
      </div>

      <div className="stat-card month">
        <div className="stat-icon">💰</div>
        <div className="stat-info">
          <div className="stat-value">${totalRevenue.toFixed(2)}</div>
          <div className="stat-label">Monthly Revenue</div>
        </div>
      </div>

      <div className="stat-card total">
        <div className="stat-icon">📈</div>
        <div className="stat-info">
          <div className="stat-value">{bookings.length}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
      </div>
    </div>
  );
};

// Enhanced AdminCalendar with multiple view modes
const AdminCalendar = ({ bookings, onDateSelect, selectedDate, onBookingUpdate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [selectedStaff, setSelectedStaff] = useState('all');
  const [staff, setStaff] = useState([]);

  // Fetch staff members
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await api.get('/staff');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  // Filter bookings by selected staff
  const getFilteredBookings = () => {
    if (selectedStaff === 'all') return bookings;
    return bookings.filter(booking => booking.staff?._id === selectedStaff);
  };

  const filteredBookings = getFilteredBookings();

  // Navigation functions
  const navigateDate = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      switch (view) {
        case 'day':
          newDate.setDate(prevDate.getDate() + direction);
          break;
        case 'week':
          newDate.setDate(prevDate.getDate() + (direction * 7));
          break;
        case 'month':
          newDate.setMonth(prevDate.getMonth() + direction);
          break;
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar data based on view
  const getCalendarData = () => {
    switch (view) {
      case 'day':
        return getDayData(currentDate);
      case 'week':
        return getWeekData(currentDate);
      case 'month':
        return getMonthData(currentDate);
      default:
        return getMonthData(currentDate);
    }
  };

  const getDayData = (date) => {
    const dayBookings = filteredBookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.toDateString() === date.toDateString();
    });

    return {
      type: 'day',
      date,
      bookings: dayBookings.sort((a, b) => a.startTime.localeCompare(b.startTime))
    };
  };

  const getWeekData = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const dayBookings = filteredBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === day.toDateString();
      });

      week.push({
        date: day,
        bookings: dayBookings.sort((a, b) => a.startTime.localeCompare(b.startTime))
      });
    }

    return {
      type: 'week',
      startDate: startOfWeek,
      days: week
    };
  };

  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayBookings = filteredBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === day.toDateString();
      });

      days.push({
        date: day,
        bookings: dayBookings
      });
    }

    return {
      type: 'month',
      days,
      currentMonth: month,
      currentYear: year
    };
  };

  const calendarData = getCalendarData();

  const getViewTitle = () => {
    const options = {
      year: 'numeric',
      month: 'long',
      ...(view === 'day' && { day: 'numeric' })
    };

    if (view === 'week') {
      const weekData = calendarData;
      const start = weekData.days[0].date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const end = weekData.days[6].date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${start} - ${end}, ${weekData.days[0].date.getFullYear()}`;
    }

    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className="admin-calendar-container">
      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button onClick={() => navigateDate(-1)} className="nav-btn">
            &#8249;
          </button>
          <div className="calendar-title-section">
            <h2 className="calendar-title">{getViewTitle()}</h2>
            <button onClick={goToToday} className="today-btn">Today</button>
          </div>
          <button onClick={() => navigateDate(1)} className="nav-btn">
            &#8250;
          </button>
        </div>

        <div className="calendar-controls">
          {/* View Controls */}
          <div className="view-controls">
            <button
              onClick={() => setView('day')}
              className={`view-btn ${view === 'day' ? 'active' : ''}`}
            >
              Day
            </button>
            <button
              onClick={() => setView('week')}
              className={`view-btn ${view === 'week' ? 'active' : ''}`}
            >
              Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`view-btn ${view === 'month' ? 'active' : ''}`}
            >
              Month
            </button>
          </div>

          {/* Staff Filter */}
          <div className="staff-filter">
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="staff-select"
            >
              <option value="all">All Staff</option>
              {staff.map(member => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="calendar-content">
        {view === 'month' && <MonthView data={calendarData} onDateSelect={onDateSelect} selectedDate={selectedDate} />}
        {view === 'week' && <WeekView data={calendarData} onDateSelect={onDateSelect} selectedDate={selectedDate} />}
        {view === 'day' && <DayView data={calendarData} onDateSelect={onDateSelect} onBookingUpdate={onBookingUpdate} />}
      </div>
    </div>
  );
};

// Month View Component
const MonthView = ({ data, onDateSelect, selectedDate }) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="month-view">
      <div className="calendar-grid">
        {/* Day Headers */}
        {dayNames.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}

        {/* Calendar Days */}
        {data.days.map((dayData, index) => {
          if (!dayData) {
            return <div key={index} className="calendar-day empty" />;
          }

          const isToday = dayData.date.toDateString() === new Date().toDateString();
          const isSelected = selectedDate && dayData.date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => onDateSelect(dayData.date)}
            >
              <div className="day-number">{dayData.date.getDate()}</div>
              <div className="bookings-indicator">
                {dayData.bookings.slice(0, 3).map((booking, idx) => (
                  <div
                    key={idx}
                    className={`booking-dot ${booking.status}`}
                    title={`${booking.service?.name} - ${booking.customer?.name} at ${booking.startTime}`}
                  />
                ))}
                {dayData.bookings.length > 3 && (
                  <div className="more-bookings">+{dayData.bookings.length - 3}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Week View Component
const WeekView = ({ data, onDateSelect, selectedDate }) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="week-view">
      <div className="week-header">
        {data.days.map((dayData, index) => (
          <div key={index} className="week-day-header">
            <div className="day-name">{dayNames[index]}</div>
            <div className={`day-number ${dayData.date.toDateString() === new Date().toDateString() ? 'today' : ''}`}>
              {dayData.date.getDate()}
            </div>
          </div>
        ))}
      </div>

      <div className="week-content">
        {data.days.map((dayData, index) => {
          const isSelected = selectedDate && dayData.date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              className={`week-day ${isSelected ? 'selected' : ''}`}
              onClick={() => onDateSelect(dayData.date)}
            >
              <div className="day-bookings">
                {dayData.bookings.map(booking => (
                  <div key={booking._id} className={`booking-block ${booking.status}`}>
                    <div className="booking-time">{booking.startTime}</div>
                    <div className="booking-service">{booking.service?.name}</div>
                    <div className="booking-customer">{booking.customer?.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Day View Component
const DayView = ({ data, onDateSelect, onBookingUpdate }) => {
  const timeSlots = generateTimeSlots();

  function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }

  const getBookingForTimeSlot = (timeSlot) => {
    return data.bookings.find(booking => booking.startTime === timeSlot);
  };

  return (
    <div className="day-view">
      <div className="day-header">
        <h3>{data.date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</h3>
        <div className="day-stats">
          <span className="booking-count">{data.bookings.length} appointments</span>
        </div>
      </div>

      <div className="time-slots-container">
        {timeSlots.map(timeSlot => {
          const booking = getBookingForTimeSlot(timeSlot);

          return (
            <div key={timeSlot} className="time-slot-row">
              <div className="time-label">{timeSlot}</div>
              <div className="appointment-slot">
                {booking ? (
                  <div className={`appointment-card ${booking.status}`}>
                    <div className="appointment-header">
                      <span className="service-name">{booking.service?.name}</span>
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <div className="customer-info">
                        <span className="customer-name">{booking.customer?.name}</span>
                        <span className="customer-phone">{booking.customer?.phone}</span>
                      </div>
                      <div className="staff-info">
                        <span className="staff-name">with {booking.staff?.name}</span>
                      </div>
                      <div className="appointment-meta">
                        <span className="duration">{booking.duration || 60} min</span>
                        <span className="price">${booking.price}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-slot">
                    <span className="available-text">Available</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// Booking Details Panel Component
const BookingDetailsPanel = ({ selectedDate, bookings }) => {
  const selectedBookings = selectedDate ? bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate.toDateString() === selectedDate.toDateString();
  }) : [];

  if (!selectedDate) {
    return (
      <div className="booking-details-panel">
        <div className="panel-header">
          <h3>Select a Date</h3>
          <p className="text-light">Click on a calendar date to view bookings</p>
        </div>
        <div className="empty-state">
          <div className="service-icon">📅</div>
          <p>No date selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-details-panel">
      <div className="panel-header">
        <h3>Bookings for {selectedDate.toLocaleDateString()}</h3>
        <div className="bookings-count">
          {selectedBookings.length} appointments
        </div>
      </div>

      {selectedBookings.length === 0 ? (
        <div className="empty-state">
          <div className="service-icon">✨</div>
          <p>No bookings for this date</p>
        </div>
      ) : (
        <div className="bookings-list">
          {selectedBookings.map(booking => (
            <div key={booking._id} className="booking-item">
              <div className="booking-time">
                {booking.startTime} - {booking.endTime}
              </div>
              <div className="booking-details">
                <div className="service-info">
                  <span className="service-name">{booking.service?.name}</span>
                  <span className="service-subcategory">{booking.subCategory}</span>
                </div>
                <div className="customer-info">
                  <span className="customer-name">{booking.customer?.name}</span>
                  <span className="staff-name">with {booking.staff?.name}</span>
                </div>
                <div className="booking-meta">
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status}
                  </span>
                  <span className="price">${booking.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
          <Button type="submit" className="btn-primary" style={{ marginLeft: '10px' }}>Create Service</Button>
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
    services: [],
    workingHours: {
      startTime: '09:00',
      endTime: '18:00',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useAuth();

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        services: [],
        workingHours: {
          startTime: '09:00',
          endTime: '18:00',
          workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        }
      });
      setProfileImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be less than 5MB', 'error');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
      }

      setProfileImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      services: [],
      workingHours: {
        startTime: '09:00',
        endTime: '18:00',
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      }
    });
    setProfileImageFile(null);
    setImagePreview(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);

      // Append services
      formData.services.forEach(serviceId => {
        formDataToSend.append('services', serviceId);
      });

      // Append working hours
      formDataToSend.append('workingHours[startTime]', formData.workingHours.startTime);
      formDataToSend.append('workingHours[endTime]', formData.workingHours.endTime);
      formData.workingHours.workingDays.forEach(day => {
        formDataToSend.append('workingHours[workingDays]', day);
      });

      // Append profile image if selected
      if (profileImageFile) {
        formDataToSend.append('profileImage', profileImageFile);
      }

      console.log('Sending FormData with entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      await api.post('/staff/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      showToast('Staff member created successfully', 'success');
      onSave();
      handleClose();
    } catch (error) {
      console.error('Error creating staff:', error);

      let errorMessage = 'Failed to create staff member';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage = error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }

      showToast(errorMessage, 'error');
    } finally {
      setUploading(false);
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Staff Member">
      <form onSubmit={handleSubmit} className="space-y-4 p-4" encType="multipart/form-data">
        <Input
          label="Full Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="Email (Optional)"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Input
          label="Phone (Optional)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        {/* Profile Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image (Optional)
          </label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-50 file:text-purple-700
                         hover:file:bg-purple-100 cursor-pointer"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="relative w-24 h-24">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProfileImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {profileImageFile && (
              <p className="text-sm text-green-600">
                Selected: {profileImageFile.name}
              </p>
            )}
          </div>
        </div>

        {/* Working Hours Section */}
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

          {/* Working Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Days
            </label>
            <div className="grid grid-cols-2 gap-2">
              {daysOfWeek.map(day => (
                <label key={day.key} className="flex justify-between items-center">
                  <span className="text-sm">{day.label}</span>
                  <input
                    type="checkbox"
                    className="ml-2"
                    checked={formData.workingHours.workingDays.includes(day.key)}
                    onChange={(e) => handleWorkingDayChange(day.key, e.target.checked)}
                  />
                </label>
              ))}
            </div>
          </div>

          <br />

          {/* Assign Services */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Services *
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded p-3">
              {services.map(service => (
                <label key={service._id} className="flex justify-between items-center">
                  <span className="text-sm">{service.name}</span>
                  <input
                    type="checkbox"
                    className="ml-2"
                    checked={formData.services.includes(service._id)}
                    onChange={(e) => {
                      const selectedServices = e.target.checked
                        ? [...formData.services, service._id]
                        : formData.services.filter(id => id !== service._id);
                      setFormData({ ...formData, services: selectedServices });
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            onClick={handleClose}
            className="btn btn-secondary"
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? 'Creating...' : 'Add Staff Member'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};


// Enhanced Staff Display with Profile Images
const StaffDisplay = ({ staff }) => {
  const getImageUrl = (profileImage) => {
    if (!profileImage) return null;

    // If it's already a full URL, use it directly
    if (profileImage.startsWith('http')) {
      return profileImage;
    }

    // Construct the full URL using your backend domain
    const backendUrl = process.env.NODE_ENV === 'production'
      ? 'https://salon-booking-app-yv82.onrender.com'
      : 'http://localhost:5000';

    return `${backendUrl}${profileImage}`;
  };

  return (
    <div className="staff-management-grid">
      {staff.map(member => (
        <div key={member._id} className="staff-card slide-in-left">
          <div className="staff-avatar">
            {member.profileImage ? (
              <>
                <img
                  src={getImageUrl(member.profileImage)}
                  alt={member.name}
                  className="staff-profile-image"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    console.error(`Failed to load image: ${getImageUrl(member.profileImage)}`);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  onLoad={() => {
                    // Hide fallback when image loads successfully
                    const fallback = document.querySelector(`#fallback-${member._id}`);
                    if (fallback) fallback.style.display = 'none';
                  }}
                />
                <div
                  id={`fallback-${member._id}`}
                  className="avatar-fallback"
                  style={{ display: 'flex' }}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
              </>
            ) : (
              <div className="avatar-fallback">
                {member.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h3>{member.name}</h3>
          {member.email && (
            <p className="text-light">{member.email}</p>
          )}
          {member.phone && (
            <p className="text-light">{member.phone}</p>
          )}

          <div className="staff-services-list">
            <h4>Assigned Services:</h4>
            {member.services?.length > 0 ? (
              <div>
                {member.services.map((service, index) => (
                  <span key={index} className="staff-service-tag">
                    {service.name || 'Service'}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-light text-sm">No services assigned</p>
            )}
          </div>

          {member.workingHours && (
            <div className="staff-working-hours">
              <h4>Working Hours:</h4>
              <p>
                {member.workingHours.startTime || '9:00'} - {member.workingHours.endTime || '18:00'}
              </p>
              {member.workingHours.workingDays && (
                <p className="mt-1">
                  {member.workingHours.workingDays.join(', ')}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

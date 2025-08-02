import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AppContext';
import { Card, Button, Select, Input } from './UI';

const BookingSteps = {
  SERVICE: 1,
  SUBCATEGORY: 2,
  STAFF: 3,
  DATETIME: 4,
  CONTACT: 5,
  CONFIRMATION: 6
};

export const MultiStepBooking = () => {
  const [currentStep, setCurrentStep] = useState(BookingSteps.SERVICE);
  const [bookingData, setBookingData] = useState({
    service: '',
    subCategory: '',
    staff: '',
    date: '',
    time: '',
    duration: 0,
    price: 0
  });
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { user, showToast } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      showToast('Failed to load services', 'error');
    }
  };

  const fetchStaff = async (serviceId) => {
    try {
      const response = await api.get(`/staff/by-service/${serviceId}`);
      setStaff(response.data);
    } catch (error) {
      showToast('Failed to load staff', 'error');
    }
  };

  const fetchAvailableSlots = async (staffId, date, duration) => {
    try {
      const response = await api.get('/bookings/available-slots', {
        params: { staffId, date, duration }
      });
      setAvailableSlots(response.data);
    } catch (error) {
      showToast('Failed to load available slots', 'error');
    }
  };

  const handleServiceSelect = (serviceId) => {
    const selectedService = services.find(s => s._id === serviceId);
    setBookingData({ 
      ...bookingData, 
      service: serviceId,
      subCategory: '',
      staff: '',
      date: '',
      time: ''
    });
    fetchStaff(serviceId);
    setCurrentStep(BookingSteps.SUBCATEGORY);
  };

  const handleSubCategorySelect = (subCategoryName) => {
    const selectedService = services.find(s => s._id === bookingData.service);
    const subCategory = selectedService.subCategories.find(sc => sc.name === subCategoryName);
    
    setBookingData({
      ...bookingData,
      subCategory: subCategoryName,
      duration: subCategory.duration,
      price: subCategory.price
    });
    
    setCurrentStep(BookingSteps.STAFF);
  };

  const handleStaffSelect = (staffId) => {
    setBookingData({ ...bookingData, staff: staffId });
    setCurrentStep(BookingSteps.DATETIME);
  };

  const handleDateTimeSelect = (date, time) => {
    setBookingData({ ...bookingData, date, time });
    setCurrentStep(BookingSteps.CONTACT);
  };

  const handleContactSubmit = (contactData) => {
    setBookingData({ ...bookingData, ...contactData });
    setCurrentStep(BookingSteps.CONFIRMATION);
  };

  const handleFinalBooking = async () => {
    setLoading(true);
    try {
      const bookingPayload = {
        service: bookingData.service,
        subCategory: bookingData.subCategory,
        staff: bookingData.staff,
        date: bookingData.date,
        startTime: bookingData.time,
        endTime: calculateEndTime(bookingData.time, bookingData.duration),
        duration: bookingData.duration,
        price: bookingData.price
      };

      await api.post('/bookings', bookingPayload);
      showToast('Booking confirmed successfully!', 'success');
      navigate('/my-bookings');
    } catch (error) {
      showToast('Failed to create booking', 'error');
    }
    setLoading(false);
  };

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMins = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const renderStepContent = () => {
    const service = services.find(s => s._id === bookingData.service);
    const staffMember = staff.find(s => s._id === bookingData.staff);
    
    switch (currentStep) {
      case BookingSteps.SERVICE:
        return <ServiceSelection services={services} onSelect={handleServiceSelect} />;
      
      case BookingSteps.SUBCATEGORY:
        return (
          <SubCategorySelection 
            service={service} 
            onSelect={handleSubCategorySelect}
            onBack={() => setCurrentStep(BookingSteps.SERVICE)}
          />
        );
      
      case BookingSteps.STAFF:
        return (
          <StaffSelection 
            staff={staff} 
            onSelect={handleStaffSelect}
            onBack={() => setCurrentStep(BookingSteps.SUBCATEGORY)}
          />
        );
      
      case BookingSteps.DATETIME:
        return (
          <DateTimeSelection 
            bookingData={bookingData}
            availableSlots={availableSlots}
            onSelect={handleDateTimeSelect}
            onDateChange={(date) => fetchAvailableSlots(bookingData.staff, date, bookingData.duration)}
            onBack={() => setCurrentStep(BookingSteps.STAFF)}
          />
        );
      
      case BookingSteps.CONTACT:
        return (
          <ContactDetails 
            user={user}
            onSubmit={handleContactSubmit}
            onBack={() => setCurrentStep(BookingSteps.DATETIME)}
          />
        );
      
      case BookingSteps.CONFIRMATION:
        return (
          <BookingConfirmation 
            bookingData={bookingData}
            selectedService={service}
            selectedStaff={staffMember}
            onConfirm={handleFinalBooking}
            onBack={() => setCurrentStep(BookingSteps.CONTACT)}
            loading={loading}
          />
        );
      
      default:
        return null;
    }
  };

  const stepTitles = {
    1: 'Service',
    2: 'Style',
    3: 'Stylist',
    4: 'Date & Time',
    5: 'Contact',
    6: 'Confirm'
  };

  return (
    <div className="container mx-auto py-8">
      <style>
        {`
          .booking-container {
            max-width: 48rem; /* 768px */
            margin-left: auto;
            margin-right: auto;
            background-color: #fff;
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .step-indicator-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            margin-bottom: 2.5rem;
          }
          .step-indicator-bg {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 4px;
            background-color: #e5e7eb;
            transform: translateY(-50%);
            z-index: 0;
          }
          .progress-bar {
            height: 100%;
            background:#d4af37;
            transition: width 0.5s ease-in-out;
          }
          .step-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 10;
            text-align: center;
          }
          .step-circle {
            width: 2.5rem; /* 40px */
            height: 2.5rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 700;
            margin-bottom: 0.5rem;
            transition: background-color 0.3s ease-in-out;
          }
          .step-circle.active {
            background-color: #ec4899; /* pink-500 */
          }
          .step-circle.inactive {
            background-color: #d1d5db; /* gray-300 */
          }
          .step-title {
            font-size: 0.875rem; /* text-sm */
            line-height: 1.25rem;
            display: none;
            color: #6b7280; /* gray-500 */
          }
          @media (min-width: 768px) {
            .step-title {
              display: block;
            }
          }
          .step-title.active {
            color: #ec4899; /* pink-500 */
          }
          .section-heading {
            font-size: 1.5rem; /* text-2xl */
            line-height: 2rem;
            font-weight: 600;
            color: #1f2937; /* gray-800 */
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .service-card {
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }
          .service-card:hover {
            border-color: #ec4899; /* pink-500 */
            transform: scale(1.02);
          }
          .service-icon {
            font-size: 1.875rem; /* text-3xl */
          }
          .service-title {
            font-weight: 600;
            font-size: 1.125rem;
            line-height: 1.75rem;
            color: #1f2937; /* gray-800 */
          }
          .service-desc {
            font-size: 0.875rem; /* text-sm */
            line-height: 1.25rem;
            color: #6b7280; /* gray-500 */
          }
          .sub-category-card {
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }
          .sub-category-card:hover {
            border-color: #ec4899; /* pink-500 */
          }
          .sub-category-card.selected {
            border-color: #ec4899;
            background-color: #fdf2f8; /* pink-50 */
          }
          .back-button {
            background-color: #e5e7eb; /* gray-200 */
            color: #4b5563; /* gray-600 */
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            transition: background-color 0.3s;
          }
          .back-button:hover {
            background-color: #d1d5db; /* gray-300 */
          }
          .form-input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            transition: border-color 0.3s, box-shadow 0.3s;
          }
          .form-input:focus {
            outline: none;
            border-color: #ec4899; /* pink-500 */
            box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.5);
          }
          .button-primary {
            background-color: #ec4899; /* pink-500 */
            color: #fff;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            width: 100%;
            transition: background-color 0.3s;
          }
          .button-primary:hover {
            background-color: #d12c6a; /* pink-600 */
          }
          .time-slot-btn {
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
            transition: all 0.3s;
          }
          .time-slot-btn:hover {
            border-color: #ec4899;
            background-color: #fdf2f8;
          }
          .time-slot-btn.selected {
            background-color: #ec4899;
            color: #fff;
            border-color: #ec4899;
          }
          .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #ec4899;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            animation: spin 1s linear infinite;
            margin: auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="booking-container">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Book Your Appointment</h1>

        <div className="step-indicator-container">
          <div className="step-indicator-bg">
            <div 
              className="progress-bar"
              style={{ width: `${((currentStep - 1) / (Object.keys(BookingSteps).length - 1)) * 100}%` }}
            ></div>
          </div>
          {Object.values(BookingSteps).map((step) => (
            <div
              key={step}
              className={`step-item ${step <= currentStep ? 'active' : ''}`}
            >
              <div
                className={`step-circle ${step <= currentStep ? 'active' : 'inactive'}`}
              >
                {step}
              </div>
              <span className={`step-title ${step <= currentStep ? 'active' : ''}`}>{stepTitles[step]}</span>
            </div>
          ))}
        </div>
        
        {renderStepContent()}
      </div>
    </div>
  );
};

const ServiceSelection = ({ services, onSelect }) => (
  <div className="space-y-4">
    <h2 className="section-heading">Select a Service</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <div
          key={service._id}
          className="service-card"
          onClick={() => onSelect(service._id)}
        >
          <div className="flex items-center space-x-4">
            <span className="service-icon">{service.icon}</span>
            <div className="flex-1">
              <h3 className="service-title">{service.name}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SubCategorySelection = ({ service, onSelect, onBack }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        {service.name} - Choose Style
      </h2>
      <button onClick={onBack} className="back-button">Back</button>
    </div>
    <div className="space-y-4">
      {service.subCategories.map(subCategory => (
        <div
          key={subCategory.name}
          className="sub-category-card mt-4"
          onClick={() => onSelect(subCategory.name)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">{subCategory.name}</h3>
              <p className="text-gray-600 text-sm">{subCategory.duration} minutes</p>
            </div>
            <p className="text-pink-600 font-semibold text-lg">${subCategory.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StaffSelection = ({ staff, onSelect, onBack }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">Choose Your Stylist</h2>
      <button onClick={onBack} className="back-button">Back</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {staff.map(member => (
        <div
          key={member._id}
          className="sub-category-card"
          onClick={() => onSelect(member._id)}
        >
          <h3 className="font-semibold text-lg text-gray-800 text-uppercase">{member.name}</h3>
          <p className="text-gray-600 text-sm">Professional Stylist</p>
        </div>
      ))}
    </div>
  </div>
);

const DateTimeSelection = ({ bookingData, availableSlots, onSelect, onDateChange, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setLoading(true);
    
    try {
      await onDateChange(date);
    } catch (error) {
      console.error('Error loading time slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Select Date & Time</h2>
        <button onClick={onBack} className="back-button">Back</button>
      </div>
      
      <div className="mb-6">
        <Input
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          min={today}
          required
        />
      </div>

      {selectedDate && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Time Slots
          </label>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="loading-spinner"></div>
              <p className="text-gray-500 mt-2">Loading available slots...</p>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {availableSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                  onClick={() => handleTimeSelect(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-100 rounded-xl">
              <p>No available time slots for this date.</p>
              <p className="text-sm mt-1">Please select a different date.</p>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={!selectedDate || !selectedTime || loading}
        className="button-primary"
      >
        Continue to Contact Details
      </button>
    </div>
  );
};


const ContactDetails = ({ user, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Contact Details</h2>
        <button onClick={onBack} className="back-button">Back</button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Notes (Optional)
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
            rows="3"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Any special requests or notes..."
          />
        </div>
        <button type="submit" className="button-primary">
          Review Booking
        </button>
      </form>
    </div>
  );
};

const BookingConfirmation = ({ bookingData, selectedService, selectedStaff, onConfirm, onBack, loading }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Confirm Your Booking</h2>
        <button onClick={onBack} className="back-button">Back</button>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-xl space-y-4 mb-6">
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Service:</span>
          <span className="text-gray-900">{selectedService?.name} - {bookingData.subCategory}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Stylist:</span>
          <span className="text-gray-900">{selectedStaff?.name}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Date:</span>
          <span className="text-gray-900">{new Date(bookingData.date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Time:</span>
          <span className="text-gray-900">{bookingData.time}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Duration:</span>
          <span className="text-gray-900">{bookingData.duration} minutes</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold text-pink-600 pt-4">
          <span>Total Price:</span>
          <span>${bookingData.price}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={loading}
        className="button-primary text-lg py-3"
      >
        {loading ? 'Confirming Booking...' : 'Confirm Booking'}
      </button>
      
      <p className="text-sm text-gray-600 text-center mt-3">
        A confirmation email will be sent to your email address
      </p>
    </div>
  );
};

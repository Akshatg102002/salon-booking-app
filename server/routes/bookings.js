const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Service = require('../models/Service');
const StaffProfile = require('../models/StaffProfile'); // Add this import
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Get available time slots - SIMPLIFIED VERSION
router.get('/available-slots', async (req, res) => {
  try {
    const { staffId, date, duration } = req.query;
    
    if (!staffId || !date || !duration) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }
    
    // Get staff (either User or StaffProfile)
    let staff = await User.findById(staffId);
    let workingHours;
    
    if (staff && staff.role === 'staff') {
      // Legacy staff user - use old format
      workingHours = staff.staffInfo?.workingHours;
    } else {
      // New StaffProfile - use simplified format
      staff = await StaffProfile.findById(staffId);
      workingHours = staff?.workingHours;
    }
    
    if (!staff || !workingHours) {
      return res.json([]);
    }
    
    // Check if staff works on this day
    const selectedDate = new Date(date);
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[selectedDate.getDay()];
    
    // For new simplified format
    if (workingHours.workingDays && !workingHours.workingDays.includes(dayName)) {
      return res.json([]); // Staff doesn't work on this day
    }
    
    // For legacy format
    if (workingHours[dayName] && !workingHours[dayName].available) {
      return res.json([]); // Staff doesn't work on this day
    }
    
    // Get existing bookings for this date
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingBookings = await Booking.find({
      staff: staffId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: 'confirmed'
    });
    
    // Generate available slots
    const slots = generateSimpleTimeSlots(workingHours, existingBookings, parseInt(duration), dayName);
    
    res.json(slots);
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ message: error.message });
  }
});

// Simplified time slot generation function
function generateSimpleTimeSlots(workingHours, existingBookings, duration, dayName) {
  const slots = [];
  
  let startTime, endTime;
  
  // Handle both new simplified format and legacy format
  if (workingHours.startTime && workingHours.endTime) {
    // New simplified format
    startTime = workingHours.startTime;
    endTime = workingHours.endTime;
  } else if (workingHours[dayName]) {
    // Legacy format
    startTime = workingHours[dayName].start;
    endTime = workingHours[dayName].end;
  } else {
    // Default fallback
    startTime = '09:00';
    endTime = '18:00';
  }
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  // Generate 30-minute slots
  for (let time = startMinutes; time + duration <= endMinutes; time += 30) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    // Check if this slot conflicts with existing bookings
    const slotEndTime = time + duration;
    const isAvailable = !existingBookings.some(booking => {
      const [bookingStartHour, bookingStartMinute] = booking.startTime.split(':').map(Number);
      const [bookingEndHour, bookingEndMinute] = booking.endTime.split(':').map(Number);
      
      const bookingStart = bookingStartHour * 60 + bookingStartMinute;
      const bookingEnd = bookingEndHour * 60 + bookingEndMinute;
      
      // Check for overlap
      return (time < bookingEnd && slotEndTime > bookingStart);
    });
    
    if (isAvailable) {
      slots.push(timeString);
    }
  }
  
  return slots;
}

// Create booking with conflict checking
router.post('/', auth, async (req, res) => {
  try {
    const { service, subCategory, staff, date, startTime, duration, price } = req.body;
    
    // Calculate end time
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const totalMinutes = startHour * 60 + startMinute + duration;
    const endHour = Math.floor(totalMinutes / 60);
    const endMin = totalMinutes % 60;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
    
    // Check for conflicts before creating booking
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const conflictingBooking = await Booking.findOne({
      staff: staff,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: 'confirmed',
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gt: startTime } }
          ]
        },
        {
          $and: [
            { startTime: { $lt: endTime } },
            { endTime: { $gte: endTime } }
          ]
        },
        {
          $and: [
            { startTime: { $gte: startTime } },
            { endTime: { $lte: endTime } }
          ]
        }
      ]
    });
    
    if (conflictingBooking) {
      return res.status(409).json({ message: 'This time slot is no longer available' });
    }
    
    const booking = new Booking({
      customer: req.user.userId,
      service,
      subCategory,
      staff,
      date: selectedDate,
      startTime,
      endTime,
      duration,
      price
    });
    
    await booking.save();
    
    // Populate booking details for email
    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email')
      .populate('staff', 'name')
      .populate('service', 'name');

    // Send confirmation email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: populatedBooking.customer.email,
        subject: 'Booking Confirmation - Salon',
        html: `
          <h2>Booking Confirmed!</h2>
          <p>Dear ${populatedBooking.customer.name},</p>
          <p>Your booking has been confirmed:</p>
          <ul>
            <li><strong>Service:</strong> ${populatedBooking.service.name} - ${booking.subCategory}</li>
            <li><strong>Staff:</strong> ${populatedBooking.staff.name}</li>
            <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</li>
            <li><strong>Duration:</strong> ${booking.duration} minutes</li>
            <li><strong>Price:</strong> $${booking.price}</li>
          </ul>
          <p>Thank you for choosing our salon!</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.userId })
      .populate('service', 'name')
      .sort({ date: -1 });

    // Manually populate staff (could be User or StaffProfile)
    const populatedBookings = await Promise.all(bookings.map(async (booking) => {
      let staffData = null;
      
      // Try to find staff as User first
      let staff = await User.findById(booking.staff).select('name');
      if (staff) {
        staffData = { name: staff.name, type: 'user' };
      } else {
        // Try to find as StaffProfile
        staff = await StaffProfile.findById(booking.staff).select('name');
        if (staff) {
          staffData = { name: staff.name, type: 'profile' };
        }
      }

      return {
        ...booking.toObject(),
        staff: staffData
      };
    }));

    res.json(populatedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customer', 'name email phone')
      .populate('service', 'name')
      .sort({ date: -1 });

    // Manually populate staff for each booking
    const populatedBookings = await Promise.all(bookings.map(async (booking) => {
      let staffData = null;
      
      // Try User first, then StaffProfile
      let staff = await User.findById(booking.staff).select('name');
      if (staff) {
        staffData = { name: staff.name, type: 'user' };
      } else {
        staff = await StaffProfile.findById(booking.staff).select('name');
        if (staff) {
          staffData = { name: staff.name, type: 'profile' };
        }
      }

      return {
        ...booking.toObject(),
        staff: staffData
      };
    }));

    res.json(populatedBookings);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user owns this booking or is admin
    if (booking.customer.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (for staff/admin)
router.patch('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get staff appointments - FIXED VERSION  
router.get('/staff-appointments', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ staff: req.user.userId })
      .populate('customer', 'name phone')
      .populate('service', 'name')
      .sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

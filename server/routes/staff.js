const express = require('express');
const User = require('../models/User');
const StaffProfile = require('../models/StaffProfile'); // Add this
const auth = require('../middleware/auth');

const router = express.Router();

// Get all staff members (both user accounts and profiles)
router.get('/', async (req, res) => {
  try {
    // Get staff user accounts
    const staffUsers = await User.find({ role: 'staff' })
      .populate('staffInfo.services', 'name')
      .select('-password');
    
    // Get staff profiles
    const staffProfiles = await StaffProfile.find({ isActive: true })
      .populate('services', 'name');
    
    // Combine both types
    const allStaff = [
      ...staffUsers.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        type: 'user',
        services: user.staffInfo?.services || [],
        workingHours: user.staffInfo?.workingHours
      })),
      ...staffProfiles.map(profile => ({
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        type: 'profile',
        services: profile.services,
        workingHours: profile.workingHours
      }))
    ];
    
    res.json(allStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create staff profile (not a user account)
router.post('/profile', auth, async (req, res) => {
  try {
    const staffProfile = new StaffProfile(req.body);
    await staffProfile.save();
    
    const populatedProfile = await StaffProfile.findById(staffProfile._id)
      .populate('services', 'name');
    
    res.status(201).json(populatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get staff by service (include both users and profiles)
router.get('/by-service/:serviceId', async (req, res) => {
  try {
    // Get staff users assigned to this service
    const staffUsers = await User.find({
      role: 'staff',
      'staffInfo.services': req.params.serviceId
    }).select('-password');
    
    // Get staff profiles assigned to this service
    const staffProfiles = await StaffProfile.find({
      services: req.params.serviceId,
      isActive: true
    });
    
    // Combine both
    const allStaff = [
      ...staffUsers.map(user => ({
        _id: user._id,
        name: user.name,
        type: 'user'
      })),
      ...staffProfiles.map(profile => ({
        _id: profile._id,
        name: profile.name,
        type: 'profile'
      }))
    ];
    
    res.json(allStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update staff profile
router.put('/profile/:id', auth, async (req, res) => {
  try {
    const profile = await StaffProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('services', 'name');
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete staff profile
router.delete('/profile/:id', auth, async (req, res) => {
  try {
    await StaffProfile.findByIdAndUpdate(
      req.params.id, 
      { isActive: false },
      { new: true }
    );
    res.json({ message: 'Staff profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

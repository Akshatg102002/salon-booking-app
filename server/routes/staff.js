const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const StaffProfile = require('../models/StaffProfile');
const auth = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads/profiles');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
}); // ✅ Fixed: Added missing closing brace

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
}); // ✅ Fixed: Added missing closing brace

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
        profileImage: null, // Legacy users don't have profile images
        type: 'user',
        services: user.staffInfo?.services || [],
        workingHours: user.staffInfo?.workingHours
      })),
      ...staffProfiles.map(profile => ({
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        profileImage: profile.profileImage,
        type: 'profile',
        services: profile.services,
        workingHours: profile.workingHours
      }))
    ];
    
    res.json(allStaff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ message: error.message });
  }
}); // ✅ Fixed: Added missing closing brace

// Create staff profile with image upload
router.post('/profile', auth, upload.single('profileImage'), async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    console.log('Request file:', req.file); // Debug log
    
    const { name, email, phone } = req.body;
    
    // Parse services and workingHours from FormData
    let services = [];
    let workingHours = {
      startTime: '09:00',
      endTime: '18:00',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    };

    // Handle services array from FormData
    if (req.body.services) {
      if (Array.isArray(req.body.services)) {
        services = req.body.services;
      } else {
        services = [req.body.services];
      }
    } // ✅ Fixed: Added missing closing brace

    // Handle workingHours from FormData
    if (req.body['workingHours[startTime]']) {
      workingHours.startTime = req.body['workingHours[startTime]'];
    } // ✅ Fixed: Added missing closing brace
    
    if (req.body['workingHours[endTime]']) {
      workingHours.endTime = req.body['workingHours[endTime]'];
    } // ✅ Fixed: Added missing closing brace
    
    if (req.body['workingHours[workingDays]']) {
      if (Array.isArray(req.body['workingHours[workingDays]'])) {
        workingHours.workingDays = req.body['workingHours[workingDays]'];
      } else {
        workingHours.workingDays = [req.body['workingHours[workingDays]']];
      }
    } // ✅ Fixed: Added missing closing brace

    const staffData = {
      name: name || '',
      email: email || '',
      phone: phone || '',
      services,
      workingHours
    };

    // Add profile image path if uploaded
    if (req.file) {
      staffData.profileImage = `/uploads/profiles/${req.file.filename}`;
    } // ✅ Fixed: Added missing closing brace

    console.log('Staff data to save:', staffData); // Debug log

    const staffProfile = new StaffProfile(staffData);
    await staffProfile.save();
    
    const populatedProfile = await StaffProfile.findById(staffProfile._id)
      .populate('services', 'name');
    
    res.status(201).json(populatedProfile);
  } catch (error) {
    console.error('Error creating staff profile:', error);
    
    // Clean up uploaded file if there was an error
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up uploaded file:', unlinkError);
      }
    } // ✅ Fixed: Added missing closing brace
    
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}); // ✅ Fixed: Added missing closing brace

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
        email: user.email,
        profileImage: null,
        type: 'user',
        workingHours: user.staffInfo?.workingHours
      })),
      ...staffProfiles.map(profile => ({
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        profileImage: profile.profileImage,
        type: 'profile',
        workingHours: profile.workingHours
      }))
    ];
    
    res.json(allStaff);
  } catch (error) {
    console.error('Error fetching staff by service:', error);
    res.status(500).json({ message: error.message });
  }
}); // ✅ Fixed: Added missing closing brace

// Update staff profile with optional image upload
router.put('/profile/:id', auth, upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    let services = [];
    let workingHours = {};

    // Parse services and workingHours similar to create route
    if (req.body.services) {
      if (Array.isArray(req.body.services)) {
        services = req.body.services;
      } else {
        services = [req.body.services];
      }
    } // ✅ Fixed: Added missing closing brace

    if (req.body['workingHours[startTime]']) {
      workingHours.startTime = req.body['workingHours[startTime]'];
    } // ✅ Fixed: Added missing closing brace
    
    if (req.body['workingHours[endTime]']) {
      workingHours.endTime = req.body['workingHours[endTime]'];
    } // ✅ Fixed: Added missing closing brace
    
    if (req.body['workingHours[workingDays]']) {
      if (Array.isArray(req.body['workingHours[workingDays]'])) {
        workingHours.workingDays = req.body['workingHours[workingDays]'];
      } else {
        workingHours.workingDays = [req.body['workingHours[workingDays]']];
      }
    } // ✅ Fixed: Added missing closing brace

    const updateData = {
      name,
      email,
      phone,
      services,
      workingHours
    };

    // Get existing profile to handle old image cleanup
    const existingProfile = await StaffProfile.findById(req.params.id);
    
    // Add new profile image if uploaded
    if (req.file) {
      updateData.profileImage = `/uploads/profiles/${req.file.filename}`;
      
      // Clean up old profile image
      if (existingProfile?.profileImage) {
        const oldImagePath = path.join(__dirname, '..', existingProfile.profileImage);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (unlinkError) {
          console.error('Error cleaning up old image:', unlinkError);
        }
      } // ✅ Fixed: Added missing closing brace
    } // ✅ Fixed: Added missing closing brace

    const profile = await StaffProfile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('services', 'name');
    
    if (!profile) {
      return res.status(404).json({ message: 'Staff profile not found' });
    } // ✅ Fixed: Added missing closing brace
    
    res.json(profile);
  } catch (error) {
    console.error('Error updating staff profile:', error);
    
    // Clean up uploaded file if there was an error
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up uploaded file:', unlinkError);
      }
    } // ✅ Fixed: Added missing closing brace
    
    res.status(500).json({ message: error.message });
  }
}); // ✅ Fixed: Added missing closing brace

// Delete staff profile (soft delete)
router.delete('/profile/:id', auth, async (req, res) => {
  try {
    const profile = await StaffProfile.findByIdAndUpdate(
      req.params.id, 
      { isActive: false },
      { new: true }
    );
    
    if (!profile) {
      return res.status(404).json({ message: 'Staff profile not found' });
    } // ✅ Fixed: Added missing closing brace
    
    res.json({ message: 'Staff profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff profile:', error);
    res.status(500).json({ message: error.message });
  }
}); // ✅ Fixed: Added missing closing brace

// Handle multer errors
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
    }
  } // ✅ Fixed: Added missing closing brace
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({ message: 'Please upload only image files.' });
  } // ✅ Fixed: Added missing closing brace
  
  next(error);
});

module.exports = router;

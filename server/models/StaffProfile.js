const mongoose = require('mongoose');

const StaffProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  profileImage: { type: String }, // Stores the filename or URL of uploaded image
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  workingHours: {
    startTime: { type: String, required: true, default: '09:00' },
    endTime: { type: String, required: true, default: '18:00' },
    workingDays: [{ 
      type: String, 
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }]
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffProfile', StaffProfileSchema);

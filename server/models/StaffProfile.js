const mongoose = require('mongoose');

const StaffProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  workingHours: {
    startTime: { type: String, required: true, default: '09:00' }, // e.g., '09:00'
    endTime: { type: String, required: true, default: '18:00' },   // e.g., '18:00'
    workingDays: [{ 
      type: String, 
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }]
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StaffProfile', StaffProfileSchema);

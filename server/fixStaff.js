const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');

const createWorkingStaff = async () => {
  try {
    await mongoose.connect('mongodb+srv://akshatg:akshatkarmi@karmi.nukjps0.mongodb.net/salon-booking');
    
    // Get your services first
    const services = await Service.find({});
    console.log('📋 Available services:', services.map(s => s.name));
    
    // Delete existing test staff if any
    await User.deleteOne({ email: 'working-staff@salon.com' });
    
    // Create a properly configured staff member
    const workingStaff = new User({
      name: 'Available Stylist',
      email: 'working-staff@salon.com',
      phone: '1234567890',
      password: 'staff123',
      role: 'staff',
      staffInfo: {
        services: services.length > 0 ? [services[0]._id] : [], // Assign to first service
        workingHours: {
          monday: { start: '09:00', end: '18:00', available: true },
          tuesday: { start: '09:00', end: '18:00', available: true },
          wednesday: { start: '09:00', end: '18:00', available: true },
          thursday: { start: '09:00', end: '18:00', available: true },
          friday: { start: '09:00', end: '18:00', available: true },
          saturday: { start: '10:00', end: '17:00', available: true },
          sunday: { start: '11:00', end: '16:00', available: true }
        }
      }
    });

    const savedStaff = await workingStaff.save();
    console.log('✅ Working staff member created successfully!');
    console.log('📧 Email:', savedStaff.email);
    console.log('🆔 Staff ID:', savedStaff._id);
    console.log('🛠️ Assigned to service:', services[0]?.name || 'No services available');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

createWorkingStaff();

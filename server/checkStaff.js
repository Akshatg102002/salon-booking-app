const mongoose = require('mongoose');
const User = require('./models/User');

const checkStaff = async () => {
  try {
    await mongoose.connect('mongodb+srv://akshatg:akshatkarmi@karmi.nukjps0.mongodb.net/salon-booking');
    
    const staff = await User.find({ role: 'staff' });
    console.log('📊 Total staff members found:', staff.length);
    
    if (staff.length === 0) {
      console.log('❌ NO STAFF MEMBERS FOUND - This is your problem!');
    }
    
    staff.forEach((member, index) => {
      console.log(`\n👤 Staff Member ${index + 1}:`);
      console.log('Name:', member.name);
      console.log('Email:', member.email);
      console.log('Services assigned:', member.staffInfo?.services?.length || 0);
      console.log('Working hours set:', member.staffInfo?.workingHours ? 'YES' : 'NO');
      
      if (member.staffInfo?.workingHours) {
        console.log('Monday:', member.staffInfo.workingHours.monday);
        console.log('Tuesday:', member.staffInfo.workingHours.tuesday);
        // Add more days as needed
      } else {
        console.log('❌ NO WORKING HOURS SET - This will cause no time slots');
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

checkStaff();

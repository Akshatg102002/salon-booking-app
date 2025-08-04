const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://salon-booking-frontend.onrender.com'] // Update with your frontend URL
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ ADD THIS HEALTH CHECK ROUTE
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Karmi Beauty Salon Booking API is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Salon Booking API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://akshatg:akshatkarmi@karmi.nukjps0.mongodb.net/salon-booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/staff', require('./routes/staff'));

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Salon Booking API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});

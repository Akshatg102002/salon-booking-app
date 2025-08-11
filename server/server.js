const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, 'uploads'),
  path.join(__dirname, 'uploads/profiles')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://salon-booking-app-1.onrender.com'] // Your frontend URL
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ CRITICAL: Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check routes
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Karmi Beauty Salon Booking API is running!',
    timestamp: new Date().toISOString(),
    uploadsPath: '/uploads',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Salon Booking API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uploadsDirectory: fs.existsSync(path.join(__dirname, 'uploads')) ? 'Available' : 'Missing'
  });
});

// Test route for uploads directory
app.get('/test-uploads', (req, res) => {
  const uploadsPath = path.join(__dirname, 'uploads/profiles');
  try {
    const files = fs.existsSync(uploadsPath) ? fs.readdirSync(uploadsPath) : [];
    res.json({
      uploadsPath,
      filesCount: files.length,
      files: files.slice(0, 10), // Show first 10 files
      directoryExists: fs.existsSync(uploadsPath)
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      uploadsPath
    });
  }
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
    path: req.originalUrl,
    availableRoutes: [
      '/api/auth',
      '/api/services', 
      '/api/bookings',
      '/api/staff',
      '/uploads',
      '/health'
    ]
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Salon Booking API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📁 Static files served at: http://localhost:${PORT}/uploads`);
  console.log(`🖼️ Profile images at: http://localhost:${PORT}/uploads/profiles`);
});

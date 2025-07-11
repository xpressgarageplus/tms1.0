require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------
// Middleware
// ----------------------------
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));


// ----------------------------
// Static Files
// ----------------------------
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----------------------------
// Load Models
// ----------------------------
require('./models/User');
require('./models/Driver');
require('./models/Truck');
require('./models/Load');
require('./models/Payroll');
require('./models/DeliveryHistory');
require('./models/RefreshToken');
require('./models/Document');
require('./models/ChecklistProgress');

// ----------------------------
// Cron Jobs (optional)
// ----------------------------
try {
  require('./cronJobs/cleanTokens');
} catch (err) {
  console.warn('⚠️ Cron job skipped:', err.message);
}

// ----------------------------
// Routes
// ----------------------------
app.get('/api/health', (req, res) => {
  res.send('✅ TMS backend is running!');
});

app.use('/api-docs', require('./swagger'));
app.use('/api/protected', require('./routes/protected'));
app.use('/admin/checklists', require('./routes/checklistEmbedRoutes'));
app.use('/api/checklists', require('./routes/checklistProgressRoutes'));
app.use('/api/maps', require('./routes/mapsRoutes'));
app.use('/api', require('./routes')); // Main combined routes
app.use(require('./middleware/auth'));

// ----------------------------
// 404 Fallback (API)
// ----------------------------
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// ----------------------------
// Fallback to frontend
// ----------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dashboard.html'));
});

app.get('/drivers', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'driver-dashboard.html'));
});

app.get('/documents', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'documents.html'));
});

// ----------------------------
// Global Error Handler
// ----------------------------
app.use(errorHandler);

// ----------------------------
// Start Server + DB Sync
// ----------------------------
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('typeof logger:', typeof logger);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });

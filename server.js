require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------
// Middleware (Parse JSON)
// ----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------
// Static Files
// ----------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'frontend')));

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

// Health check
app.get('/api/health', (req, res) => {
  res.send('✅ TMS backend is running!');
});

// Protected API example
app.use('/api/protected', require('./routes/protected'));

// Checklist UI and state saving
app.use('/admin/checklists', require('./routes/checklistEmbedRoutes'));
app.use('/api/checklists', require('./routes/checklistProgressRoutes'));

// Other APIs
app.use('/api/maps', require('./routes/mapsRoutes'));
app.use('/api', require('./routes')); // Main API routes last

// Fallback to React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ----------------------------
// Global Error Handler
// ----------------------------
app.use(errorHandler);

// ----------------------------
// Start Server with DB Sync
// ----------------------------
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚚 TMS backend is live on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });

require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

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
require('./models/ChecklistProgress'); // If used

// ----------------------------
// Optional Cron Jobs
// ----------------------------
try {
  require('./cronJobs/cleanTokens');
} catch (err) {
  console.warn('⚠️ Cron job loader skipped (optional):', err.message);
}

// ----------------------------
// Middleware
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
// Routes
// ----------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.send('TMS backend is running!');
});

// Checklist embed (iframe) and progress API
app.use('/admin/checklists', require('./routes/checklistEmbedRoutes'));
app.use('/api/checklists', require('./routes/checklistProgressRoutes'));

// Main API routes
app.use('/api', require('./routes'));
app.use('/api/maps', require('./routes/mapsRoutes'));

// React Frontend Entry Point
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// ----------------------------
// Start Server After DB Sync
// ----------------------------
sequelize.sync({ alter: true }) // Change to { force: false } for production
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚚 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err.message);
  });

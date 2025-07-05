const cron = require('node-cron');
const syncLife360Locations = require('./syncLife360');

cron.schedule('*/5 * * * *', syncLife360Locations); // every 5 minutes

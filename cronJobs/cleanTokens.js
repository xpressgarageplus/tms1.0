const cron = require('node-cron');
const { RefreshToken } = require('../models');
const { Op } = require('sequelize');

const cleanExpiredTokens = async () => {
  try {
    const deletedCount = await RefreshToken.destroy({
      where: {
        expiryDate: {
          [Op.lt]: new Date(), // Deletes tokens with expiry date older than now
        },
      },
    });

    if (deletedCount > 0) {
      console.log(`🧹 ${deletedCount} expired refresh token(s) removed`);
    } else {
      console.log('✅ No expired tokens found');
    }
  } catch (err) {
    console.error('❌ Error while cleaning expired tokens:', err.message);
  }
};

// Run every 6 hours: minute 0 of hour 0, 6, 12, and 18
cron.schedule('0 */6 * * *', cleanExpiredTokens);

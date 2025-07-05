const { getCircleMembers } = require('../utils/life360');
const { Driver } = require('../models');

const syncLife360Locations = async () => {
  try {
    const members = await getCircleMembers();

    for (const member of members) {
      const driver = await Driver.findOne({ where: { life360Id: member.id } });
      if (!driver) continue;

      driver.lastKnownLat = member.location.latitude;
      driver.lastKnownLng = member.location.longitude;
      driver.locationUpdatedAt = new Date(parseInt(member.location.timestamp * 1000));
      await driver.save();
    }

    console.log('✅ Life360 locations synced.');
  } catch (err) {
    console.error('❌ Failed to sync Life360:', err.message);
  }
};

module.exports = syncLife360Locations;

const { getETA } = require('../utils/googleMaps');
const sendTelegramMessage = require('../utils/sendTelegram');
const { Load, Driver } = require('../models');

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // or get dynamically

const assignLoadToDriver = async (driverId, loadId) => {
  const driver = await Driver.findByPk(driverId);
  const load = await Load.findByPk(loadId);

  if (!driver || !load) {
    throw new Error('Driver or Load not found');
  }

  const eta = await getETA(load.pickupLocation, load.deliveryLocation);

  load.driverId = driver.id;
  load.estimatedDistance = eta.distanceValue;
  load.estimatedDuration = eta.durationValue;
  await load.save();

  const message = `🚛 *New Load Assigned*\n` +
    `*Driver:* ${driver.name}\n` +
    `*Pickup:* ${load.pickupLocation}\n` +
    `*Dropoff:* ${load.deliveryLocation}\n` +
    `*ETA:* ${eta.duration} (${eta.distance})`;

  await sendTelegramMessage(TELEGRAM_CHAT_ID, message);

  return load;
};

module.exports = assignLoadToDriver;

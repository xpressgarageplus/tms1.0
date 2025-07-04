const axios = require('axios');

const getETA = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
  const params = {
    origins: origin,
    destinations: destination,
    key: apiKey
  };

  const response = await axios.get(url, { params });
  const data = response.data;

  if (data.status !== 'OK') {
    throw new Error('Failed to fetch distance matrix data');
  }

  const element = data.rows[0].elements[0];
  if (element.status !== 'OK') {
    throw new Error('Invalid location provided');
  }

  return {
    distance: element.distance.text,
    duration: element.duration.text,
    distanceValue: element.distance.value,
    durationValue: element.duration.value
  };
};

module.exports = { getETA };

const assignLoadWithETA = async (driver, load) => {
  const origin = load.pickupLocation;
  const destination = load.deliveryLocation;

  const eta = await getETA(origin, destination);

  load.estimatedDistance = eta.distanceValue;
  load.estimatedDuration = eta.durationValue;
  await load.save();
};


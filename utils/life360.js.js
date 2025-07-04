const axios = require('axios');
const LIFE360_API = 'https://api.life360.com/v3';

const getCircleMembers = async () => {
  const token = process.env.LIFE360_TOKEN;
  const circleId = process.env.LIFE360_CIRCLE_ID;

  const response = await axios.get(
    `${LIFE360_API}/circles/${circleId}/members`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data.members;
};

module.exports = { getCircleMembers };

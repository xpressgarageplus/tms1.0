// services/life360Service.js
const axios = require('axios');

const BASE_URL = 'https://api.life360.com/v3';
const LIFE360_TOKEN = process.env.LIFE360_TOKEN; // Put your token in .env

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${LIFE360_TOKEN}`
  }
});

async function getCircleMembers(circleId) {
  const res = await api.get(`/circles/${circleId}/members`);
  return res.data;
}

module.exports = {
  getCircleMembers
};

const axios = require('axios');

const datClient = axios.create({
  baseURL: process.env.DAT_API_URL, // e.g., https://api.dat.com
  headers: {
    Authorization: `Bearer ${process.env.DAT_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

module.exports = datClient;

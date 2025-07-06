// middleware/cors.js
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000', // your local frontend
    'https://your-frontend-domain.com' // your deployed frontend
  ],
  credentials: true,
};

module.exports = cors(corsOptions);
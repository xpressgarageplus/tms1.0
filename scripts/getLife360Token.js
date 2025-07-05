const axios = require('axios');

const LIFE360_EMAIL = 'your_life360_email@example.com';
const LIFE360_PASSWORD = 'your_life360_password';

const CLIENT_ID = 'life360_android';
const CLIENT_SECRET = 'b1dd62be243d4479a4a6e52d82d1f041';

(async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.life360.com/v3/oauth2/token.json',
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        grant_type: 'password',
        username: LIFE360_EMAIL,
        password: LIFE360_PASSWORD
      }).toString()
    });

    console.log('✅ Bearer Token:', response.data.access_token);
  } catch (err) {
    console.error('❌ Failed to login:', err.response?.data || err.message);
  }
})();

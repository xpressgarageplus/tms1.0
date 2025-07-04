const axios = require('axios');

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DEFAULT_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendTelegramMessage = async (chatId, message) => {
  try {
    const res = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: chatId || DEFAULT_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    return res.data;
  } catch (error) {
    console.error('Telegram Error:', error.message);
  }
};

module.exports = sendTelegramMessage;

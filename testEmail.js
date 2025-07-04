require('dotenv').config();
const sendResetEmail = require('./utils/sendEmail');

const test = async () => {
  try {
    const testEmail = 'ever1smiley@yahoo.com'; // ⬅️ change this to your email
    const resetLink = 'http://localhost:3000/reset-password?token=example123';
    await sendResetEmail(testEmail, resetLink);
    console.log('✅ Test email sent!');
  } catch (err) {
    console.error('❌ Failed to send test email:', err);
  }
};

test();

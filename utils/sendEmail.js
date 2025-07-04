const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async function sendResetEmail(to, link) {
  const mailOptions = {
    from: `"TMS Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset',
    html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent');
  } catch (err) {
    console.error('❌ Failed to send password reset email:', err);
    throw new Error('Failed to send password reset email');
  }
};

// middleware/logger.js
module.exports = (req, res, next) => {
  const { method, originalUrl } = req;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${originalUrl}`);
  next();
};

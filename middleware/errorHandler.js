// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
}

module.exports = {
  errorHandler
};

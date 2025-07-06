// middleware/validateRequest.js
module.exports = function validate(fields = []) {
  return (req, res, next) => {
    const missing = fields.filter(field => !req.body[field]);

    if (missing.length) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(', ')}`
      });
    }

    next();
  };
};

// middleware/roleMiddleware.js
module.exports = function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    next();
  };
};

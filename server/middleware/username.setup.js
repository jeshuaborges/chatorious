// gives the user a random username if they have not defined one
exports.setup = function() {
  return function(req, res, next) {
    if (req.session && !req.session.username) {
      req.session.username = Math.random().toString(36).substring(7);
    }
    return next();
  };
};

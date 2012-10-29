// gives the user a random username if they have not defined one
exports.setup = function() {
  return function(req, res, next) {
    var session = req.session;

    if (session && !session.username) {
      session.username = Math.random().toString(36).substring(7);
      session.save();
    }
    return next();
  };
};

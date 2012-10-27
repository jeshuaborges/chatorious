exports.actions = function(req, res, ss) {
  req.use('session');
  req.use('username.setup');

  return {
    sendMessage: function(message) {
      if (message && message.length > 0) {
        ss.publish.all('newMessage', req.session.username, message);
        return res(true);
      } else {
        return res(false);
      }
    },

    authenticate: function(userId) {
      if (userId && userId.length > 3) {
        req.session.setUserId(userId);
        req.session.username = userId;

        return res(true);
      } else {
        return res(false);
      }
    }
  };
};

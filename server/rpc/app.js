exports.actions = function(req, res, ss) {
  // req.use('debug');
  req.use('session');
  req.use('username.setup');

  return {
    sendMessage: function(message) {
      console.log('session', req.session);
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
        req.session.save();

        return res(true);
      } else {
        return res(false);
      }
    }
  };
};

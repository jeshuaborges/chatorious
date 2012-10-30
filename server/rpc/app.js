exports.actions = function(req, res, ss) {
  req.use('session');

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
        req.session.save();

        return res(true);
      } else {
        return res(false);
      }
    },

    getUser: function() {
      if( req.session.username !== undefined ) {
        return res({
          username: req.session.username
        });
      } else {
        return res();
      }
    }
  };
};

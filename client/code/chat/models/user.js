var User = Ember.Object.extend({
  setUsername: function(username, cb) {
    this.set('username', username);
    ss.rpc('app.authenticate', username, cb);
  }
});

User.getFromSession = function(cb) {
  ss.rpc('app.getUser', cb);
};

exports.User = User;

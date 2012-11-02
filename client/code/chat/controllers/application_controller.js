var models = require('/models/user.js');

exports.ApplicationController = Ember.Controller.extend({
  init: function() {
    this.set('content', models.User.create());
  }
});

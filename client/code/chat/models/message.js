exports.Message = Ember.Object.extend({
  body: null,

  init: function() {
    this._super();

    this.set('createdAt', new Date());
  },

  send: function(cb) {
    // Push message to socketstream server
    ss.rpc('app.sendMessage', this.get('body'), cb);
  }
});

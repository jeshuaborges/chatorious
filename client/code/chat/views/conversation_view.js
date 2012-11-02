exports.ConversationView = Ember.View.extend({
  templateName: 'conversation',
  MessageView: Ember.View.extend({
    classNames: 'message'.w(),

    init: function() {
      this._super();

      var d = this.get('message.createdAt');

      this.set('timestamp', d.getHours() + ':' + this.pad2(d.getMinutes()) + ':' + this.pad2(d.getSeconds()))
    },

    pad2: function(number) {
      return (number < 10 ? '0' : '') + number;
    }
  })
});

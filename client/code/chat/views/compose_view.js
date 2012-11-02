var Message = require('/models/message.js').Message;

exports.ComposeView = Ember.View.extend({
  tagName: 'form',
  classNames: 'form-horizontal'.w(),
  templateName: 'compose',
  userBinding: 'controller.target.applicationController.content',

  BodyField: Ember.TextField.extend({
    attributeBindings:  ['placeholder'],
    sendingBinding:     'app.chatController.sending',

    placeholder: function() {
      return this.get('sending') ? 'Sending....' : 'Your message';
    }.property('sending')
  }),

  submit: function(e) {
    e.preventDefault();

    var body    = this.get('controller.content'),
        message = Message.create({body: body});

    message.send();

    this.set('controller.content','');
  }
});

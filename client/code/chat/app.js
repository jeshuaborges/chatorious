/* QUICK CHAT DEMO */
window.Chat = Chat = Ember.Application.create();

Chat.Message = Ember.Object.extend({
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

Chat.User = Ember.Object.extend({
  setUsername: function(username, cb) {
    this.set('username', username);
    ss.rpc('app.authenticate', username, cb);
  }
});


Chat.ApplicationController = Ember.Controller.extend({
  init: function() {
    this.set('content', Chat.User.create());
  }
});
Chat.ApplicationView = Ember.View.extend({
  templateName: 'application'
});


Chat.AuthenticationController = Ember.Controller.extend({});
Chat.AuthenticationView = Ember.View.extend({
  templateName: 'authentication'
});


Chat.RoomController = Ember.Controller.extend({});
Chat.RoomView = Ember.View.extend({
  templateName: 'room',
  classNames: 'room row-fluid'.w()
});


Chat.ConversationController = Ember.ArrayController.extend({
  content: Ember.A([])
});
Chat.ConversationView = Ember.View.extend({
  templateName: 'conversation'
});


Chat.ComposeController = Ember.Controller.extend({});
Chat.ComposeView = Ember.View.extend({
  tagName: 'form',
  classNames: 'form-horizontal'.w(),
  templateName: 'compose',
  userBinding: 'controller.target.applicationController.content',

  submit: function(e) {
    e.preventDefault();

    var body    = this.get('controller.content'),
        message = Chat.Message.create({body: body});

    message.send();

    this.set('controller.content','');
  }
});


Chat.RosterController = Ember.ArrayController.extend({
  content: Ember.A([])
});

Chat.RosterView = Ember.View.extend({
  tagName: 'ul'
});

Chat.MessageView = Ember.View.extend({
  classNames: 'message'.w(),

  init: function() {
    this._super();

    var d = this.get('message.createdAt');

    this.set('timestamp', d.getHours() + ':' + this.pad2(d.getMinutes()) + ':' + this.pad2(d.getSeconds()))
  },

  pad2: function(number) {
    return (number < 10 ? '0' : '') + number;
  }
});

// Extraneous demo on how ember binding makes life easy
Chat.MessageField = Ember.TextField.extend({
  attributeBindings:  ['placeholder'],
  sendingBinding:     'Chat.chatController.sending',

  placeholder: function() {
    return this.get('sending') ? 'Sending....' : 'Your message';
  }.property('sending')
});

Chat.Router = Ember.Router.extend({
  enableLogging: true,

  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      redirectsTo: 'authentication'
    }),

    authentication: Ember.Route.extend({
      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('authentication');
      },
      authenticate: function(router, e) {
        var user      = router.get('applicationController.content'),
            username  = router.get('authenticationController.content');

        user.setUsername(username, function(result) {
          if( result ) {
            router.transitionTo('room');
          } else {
            alert('Error signing in!');
          }
        });
      }
    }),

    room: Ember.Route.extend({
      route: '/room',
      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('room');
        $.each('conversation compose roster'.w(),function(i, name) {
          router.get('roomController').connectOutlet(name, name);
        });
      },
      enter: function(router) {
        // Listen out for newMessage events coming from the server
        ss.event.on('newMessage', function(username, body) {
          var message = Chat.Message.create({
            username: username,
            body: body
          });

          router.get('conversationController').pushObject(message);
        });
      }
    })
  })
});

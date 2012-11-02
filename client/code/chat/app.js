var loader = require('/loader.js'),
    app    = Ember.Application.create();

// Load the app from files
loader.load(app, ["models", "controllers", "views"]);


app.Router = Ember.Router.extend({
  enableLogging: true,

  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      enter: function(router) {
        app.User.getFromSession(function(user) {
          if( user === undefined ) {
            router.transitionTo('authentication');
          } else {
            router.transitionTo('room', user);

            // set the current user
            router.get('applicationController').set('content', app.User.create(user));
          }
        });
      }
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
        $.each('conversation compose roster queue'.w(),function(i, name) {
          router.get('roomController').connectOutlet(name, name);
        });
      },
      enter: function(router) {
        var conversation = router.get('conversationController'),
            queue = router.get('queueController');

        // Listen out for newMessage events coming from the server
        ss.event.on('newMessage', function(username, body) {
          var message = app.Message.create({
            username: username,
            body: body
          });

          conversation.pushObject(message);
        });

        ss.event.on('queue.push', function(key) {
          queue.get('content').push(key);
        });
      }
    })
  })
});

app.initialize();

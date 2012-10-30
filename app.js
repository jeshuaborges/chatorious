// My SocketStream 0.3 app

var http = require('http'),
    ss = require('socketstream');

ss.client.define('chat', {
  view: 'chat.html',
  css:  ['chat.less'],
  code: ['libs/jquery.min.js', 'libs/handlebars.js', 'libs/ember.js', 'chat'],
  tmpl: '*'
});

ss.http.route('/', function(req, res){
  res.serveClient('chat');
});

ss.client.formatters.add(require('ss-less'));
ss.client.templateEngine.use('ember');


// The socketstream static host does not return a static file when there is a
// querystring present.
ss.client.define('helper', {
  view: 'helper.html'
});

ss.http.route('/helper.html', function(req, res){
  res.serveClient('helper');
});


if (ss.env === 'production') {
  ss.client.packAssets();
}

// Start web server
var server = http.Server(ss.http.middleware);
server.listen(3000);

// Start SocketStream
ss.start(server);

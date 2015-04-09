(function() {

  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var root = __dirname + '/public/';
  var port = process.env.PORT || 3000;

//   app.use(express.static(root));


  // -- Express Session --

  var session = require('express-session');
  var genuuid = require('./controllers/uuid');

  app.use(session({
    genid: function(req) {return genuuid();},
    secret: 'chirp twerp'
  }));

  // -- Database --

  var mongojs = require('mongojs');
  var db = mongojs((process.env.MONGOLAB_URI || 'chirpy-'+process.env.CHIRPY_NODE_ENV), ['users','user-languages']);
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({'extended':'true'}));

  // -- BCrypt --
  var bcrypt = require('./controllers/bcrypt');


  // --- Server Start ---
  server.listen(port, function(){
    console.log("Listening on server port " + port);
  });


  app.get('/', function(req, res) {
    var sess = req.session;
    console.log('--- '+sess.user);

    if (sess.user) {
      res.sendFile(root+'index.html');
    }
    else {
      res.redirect('/login');
    }
  });

  app.get('/login', function(req, res) {
  });


  // Where is this used?
  module.exports = server;
}());

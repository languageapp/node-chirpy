var express = require('express');
var app = express();

var server = require('http').createServer(app);
var root = __dirname + '/public/';
app.use(express.static(root));
var port = process.env.PORT || 3000;

// -- Express Session --

var session = require('express-session');
var genuuid = require('./controllers/uuid');

app.use(session({
  genid: function(req) {return genuuid();},
  secret: 'chirp twerp'
}));


// --- Server Start ---
server.listen(port, function(){
  console.log("Listening on server port " + port);
});


app.get('/', function(req, res) {
  res.sendFile(root+'index.html');
});
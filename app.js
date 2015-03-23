// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// require body-parser
//var bodyParser = require('body-parser');
// create the express app
var app = express();
// use it!
//app.use(bodyParser.urlencoded());
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
/*app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/');
})*/
// tell the express app to listen on port 8000
var server =app.listen(8000, function() {
 console.log("listening on port 8000");
})
// this gets the socket.io module *new code!* 
var io = require('socket.io').listen(server);  
// notice we pass the server object<br>
// Whenever a connection event happens (the connection event is built in) run the following code

io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);
  //all the socket code goes in here!
  // If you don't know where this code is supposed to go reread the above info 
	socket.on("button_clicked", function (data){
		console.log('Someone clicked a button!  Reason: ' + data.reason);
		
		//Server-side emit syntax

		// 1. Emit: sends data from the server to the specific client who initiated contact.
		socket.emit('server_response', {response: "sockets are the best!"});

		// 2. Broadcast: sends data from the server to everyone BUT the client that initiated the contact.
		//socket.broadcast.emit('server_response', {response: "sockets are the best!"});
		
		// 3. Full Broadcast: sends data to all connected clients.
		//io.emit('server_response', {response: "sockets are the best!"});

	})
})
 

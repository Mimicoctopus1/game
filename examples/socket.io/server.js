/*

This is for ESModules, Express.js, and Node.js.

If you would like to see how this works before you make it, go to 

https://codesandbox.io/p/devbox/github/socketio/chat-example/tree/cjs/step5

First, I'll import the socket.io and express modules for the SERVER.
Of course, because this is a server, I'll need to go into the terminal
on the toolbar below and enter in 

npm install socket.io
npm install express@4

Notice the version number for express.

Next, import everything we need.
*/

import { Server } from "socket.io";
import { express } from "express";
import { createServer } from 'node:http';


/*Next, make some variables to handle express and our server.*/

const app = express();
const server = createServer(app);

/*IO! This is basically the server of socket.io, as is obviously stated.
*/
const io = new Server(server);



/*Next, I'll have express make sure to use the public folder for HTML.*/
app.use(express.static("public"));


/*Express (named app) retrieves index.html and displays it*/
app.get('/', function(req, res) {
  res.sendFile(new URL("./public/index.html", import.meta.url).pathname);
});


/*Set an event: When the server gets a connection, call a function. io automatically enters in who it connected with as the 
first argument, socket, so that it knows who the socket is.*/
io.on("connection", function(socket) {
  
  /*Log connection*/
  console.log("A user connected!");
  
  /*Have the SOCKET add an event: When it disconnects, log it on the SERVER.*/
  socket.on("disconnect", function() {
    console.log("A user disconnected!")
  });
  
  /*chat message is not a built-in event. Go to examples/socket.io/public/index.html now.*/
  
  
  
  
  /*You're back, it seems, or you didn't leave in the first place.*/
  /*Anyways, this script still is connectected to the client it connected to. This could possibly be running for
  multiple clients, too.
  Anyways, the next event: When the server gets a chat message event from the client, take the message as an argument...*/
  socket.on("chat message", function(msg){
    
    
    
    
    
    /*Log it.*/
    console.log("message: " + msg);
    
    /*And send it right back again, but this time, to ALL the users on the server.*/
    io.emit("chat message", msg);
    /*Now you can go back to index.html.*/
  });
});


/*Almost done. Notice that all the above constisted completely of events. That means it's all just prep for when a message does
come. Now the server is connected to the domain, or localhost if you are running this by terminal.*/
server.listen(3000, function() {
  console.log('server running at http://localhost:3000');
}); 
/*If you would like to try this out, go to the link specified at the top of this file
https://codesandbox.io/p/devbox/github/socketio/chat-example/tree/cjs/step5
*/
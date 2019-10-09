const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.PORT || 3001;

io.on("connection", socket => {
  console.log("a user connected :D");
  socket.on("chat", msg => {
    console.log(msg);
    socket.broadcast.emit("chat", msg);

  });

  // handle typing
  socket.on("typing", data => {
    console.log(data);
    socket.broadcast.emit("typing", data);
  });


  //Handle read message
  socket.on("read", obj => {
    console.log(obj , 'seen====>');
    socket.broadcast.emit("read", obj);
  });

});

server.listen(port, () => console.log("server running on port:" + port));

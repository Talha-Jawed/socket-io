const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = process.env.PORT || 3001;

io.on("connection", socket => {
  console.log("a user connected :D");
  socket.on("chat", msg => {
    socket.broadcast.emit("chat", msg);

  });

  // handle typing
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });


  //Handle read message
  socket.on("read", obj => {
    socket.broadcast.emit("read", obj);
  });

  //Handle delivered message
  socket.on("delivered", obj => {
    socket.broadcast.emit("delivered", obj);
  });

});

server.listen(port, () => console.log("server running on port:" + port));

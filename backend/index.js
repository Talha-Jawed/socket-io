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

    // socket.on('chat', function (data) {
    //   socket.broadcast.emit('chat', data);//Send Back chat to the connected Clients
    //   console.log(data)
  });

  socket.on("typing", data => {
    console.log(data);
    socket.broadcast.emit("typing", data);
  });

});

server.listen(port, () => console.log("server running on port:" + port));

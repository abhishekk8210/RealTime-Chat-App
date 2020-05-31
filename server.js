const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const formatMessage = require("./utils/formatMessage");

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const botName = "Computer";

io.on("connection", (socket) => {
  // Receive Username
  socket.on("getUsername", (name) => {
    // Welcome Client User
    socket.emit(
      "message",
      formatMessage(botName, "Welcome To the Realtime Chat Application")
    );

    //  Broadcast when a user connects.
    socket.broadcast.emit(
      "message",
      formatMessage(botName, `${name} just entered in the chat.`)
    );

    // Socekt Disconnect
    socket.on("disconnect", () => {
      io.emit("message", formatMessage(botName, `${name}  has left the chat`));
    });

    //  Receive Message
    socket.on("chatMessage", (msg) => {
      io.emit("message", formatMessage(name, msg));
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("The server is running on the port: " + PORT);
});

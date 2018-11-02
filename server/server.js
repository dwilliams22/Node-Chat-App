const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
   console.log("New user connected.");

   socket.on("createMessage", (message) => {
      console.log("Message created: ", message);
   })

   socket.emit("newMessage", {
      from: "John",
      text: "Hey!!!",
      createdAt: new Date().getTime()
   })

   socket.on("disconnect", () => {
      console.log("User was disconnected.");
   });
})

server.listen(port, () => console.log(`Express is listening on port ${port}`));
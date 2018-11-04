let socket = io();

socket.on("connect", function() {
   console.log("Connected to server.");

});

socket.on("newMessage", function(message) {
   console.log("Got new message: ", message);
   let li = $("<li></li?");
   li.text(`${message.from}: ${message.text}`)
   $("#messages").append(li);
});

socket.on("disconnect", function() {
   console.log("Disconnected from server.");
});

socket.on("newLocationMessage", function(message) {
   let li = $("<li></li?");
   let a = $('<a target="_blank">My Current Location</a>');

   li.text(`${message.from}: `);
   a.attr("href", message.url);
   li.append(a);
   $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
   e.preventDefault();

   socket.emit("createMessage", {
      from: "User",
      text: $("[name=message]").val()
   }, function(data) {
      console.log(data);
   });
});

const locationButton = $("#send-location");
locationButton.on("click", function() {
   if (!navigator.geolocation) {
      return alert("Geolocation not supported by your browser.");
   }
   navigator.geolocation.getCurrentPosition(function(positon) {
      socket.emit("createLocationMessage", {
         lat: positon.coords.latitude,
         long: positon.coords.longitude,
      });
   }, function() {
      alert("Unable to fetch location.");
   });
});
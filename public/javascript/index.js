let socket = io();

socket.on("connect", function() {
   console.log("Connected to server.");

});

socket.on("newMessage", function(message) {
   let formattedTime = moment(message.createdAt).format("h:mm a");
   let li = $("<li></li?");
   li.text(`${message.from} ${formattedTime}: ${message.text}`)
   $("#messages").append(li);
});

socket.on("disconnect", function() {
   console.log("Disconnected from server.");
});

socket.on("newLocationMessage", function(message) {
   let formattedTime = moment(message.createdAt).format("h:mm a");
   let li = $("<li></li?");
   let a = $('<a target="_blank">My Current Location</a>');

   li.text(`${message.from} ${formattedTime}: `);
   a.attr("href", message.url);
   li.append(a);
   $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
   e.preventDefault();

   let messageTextbox = $("[name=message]");

   socket.emit("createMessage", {
      from: "User",
      text: messageTextbox.val()
   }, function() {
      messageTextbox.val("");
   });
});

const locationButton = $("#send-location");
locationButton.on("click", function() {
   if (!navigator.geolocation) {
      return alert("Geolocation not supported by your browser.");
   }

   locationButton.attr("disabled", "disabled").text("Sending Location...");

   navigator.geolocation.getCurrentPosition(function(positon) {
      locationButton.removeAttr("disabled").text("Send Location");
      socket.emit("createLocationMessage", {
         lat: positon.coords.latitude,
         long: positon.coords.longitude,
      });
   }, function() {
      locationButton.removeAttr("disabled").text("Send Location");
      alert("Unable to fetch location.");
   });
});
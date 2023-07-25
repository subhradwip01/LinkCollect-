const io = require("socket.io-client");

// Replace "http://your-server-domain-or-ip:PORT" with the actual URL and port of your server
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to the server.");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server.");
});

socket.on("collection:created", (collection) => {
  console.log("new collection.", collection);
});
socket.on("collection:deleted", (collection) => {
  console.log("delted collection.", collection);
});
socket.on("bookmark:added", (bookmark) => {
  console.log("new bookmark.", bookmark);
});

socket.on("bookmark:deleted", (bookmark) => {
  console.log("delted bookmark.", bookmark);
});
socket.on("collection:upvoted", (payload) => {
  console.log("upvoted collection.", payload);
});
socket.on("collection:downvoted", (payload) => {
  console.log("downvoted collection.", payload);
});

const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(`User ${userId} joined: ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      // console.log(`Captain ${userId} updated location: ${location}`);

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Could not find location" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("trigger-payment", async (data) => {
      const { userId, ride } = data;
      const user = await userModel.findById(userId);
      if (user && user.socketId) {
        sendMessageToSocketId(user.socketId, {
          event: "payment-trigger",
          data: { ride }
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId,  messageObject) {

  console.log(messageObject);

  if (io) {
   io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket not found for id: " + socketId);
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};

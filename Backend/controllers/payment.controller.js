const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");

module.exports.confirmPayment = async (req, res) => {
  const { rideId, method, upiId } = req.body;
  if (!rideId || !method) {
    return res.status(400).json({ message: "RideId and payment method are required" });
  }

  try {
    const paymentDetails = {
      method,
      status: "paid",
      paidAt: new Date(),
      upiId: method === 'upi' ? upiId : undefined
    };

    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { 
        paymentID: "PAY" + Date.now(),
        paymentStatus: "completed",
        ...paymentDetails 
      },
      { new: true }
    ).populate("captain");

    if (ride && ride.captain?.socketId) {
      sendMessageToSocketId(ride.captain.socketId, {
        event: "payment-received",
        data: ride,
      });
    }

    return res.status(200).json({ 
      message: "Payment successful", 
      ride 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Payment failed", 
      error: error.message 
    });
  }
};
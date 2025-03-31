const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
// const mapService = require("../services/maps.service");
// const { sendMessageToSocketId } = require('../socket');
// const rideModel = require("../models/ride.model");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { pickup, destination, vehicleType } = req.body;
    
    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({ message: "Missing required fields: pickup, destination, or vehicleType" });
    }
    
    console.log(req.user._id, pickup, destination, vehicleType);
    
    const ride = await rideService.createRide({
      user: req.user._id,  
      pickup,
      destination,
      vehicleType,
    });
    
    return res.status(201).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
    // console.log(ride);
    


module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

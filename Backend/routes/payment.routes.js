const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/confirm", authMiddleware.authUser, paymentController.confirmPayment);

module.exports = router;
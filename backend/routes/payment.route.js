const express = require("express");
const router = express.Router();
const { getPaymentDetails, completePayment, getUserPayments, getAllPayments } = require("../controller/payment.controller");
const { protectRoute } = require("../middleware/protectRoute");

router.get("/:transactionId", protectRoute, getPaymentDetails);

router.post("/complete", protectRoute, completePayment);

router.get("/history", protectRoute, getUserPayments);

router.get("/all", protectRoute, getAllPayments);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings, getAdminNotifications, confirmBooking, getAdminBookings, cancelBooking } = require("../controller/booking.controller");
const { protectRoute } = require("../middleware/protectRoute");

router.post("/create", protectRoute, createBooking);

router.get("/", protectRoute, getUserBookings);

router.put("/confirm/:bookingId", protectRoute, confirmBooking);

router.get("/admin",protectRoute, getAdminBookings);

router.get("/admin/notifications", protectRoute, getAdminNotifications);

router.put("/cancel/:bookingId", protectRoute, cancelBooking);



module.exports = router;

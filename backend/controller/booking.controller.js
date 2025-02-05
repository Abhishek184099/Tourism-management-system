const Booking = require("../model/Booking");
const Package = require("../model/Package");
const crypto = require("crypto");

const Payment = require("../model/Payment");

const createBooking = async (req, res) => {
  try {
    const { packageId, numberOfPeople, bookingDate, userName, userEmail, userPhone, userAddress } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please login." });
    }

    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ error: "Package not found" });
    }

    const totalAmount = packageData.price * numberOfPeople;
    const transactionId = crypto.randomBytes(8).toString("hex");

    const newBooking = new Booking({
      user: req.user._id,
      package: packageId,
      numberOfPeople,
      bookingDate,
      userName,
      userEmail,
      userPhone,
      userAddress,
      amountPaid: totalAmount,
      paymentStatus: "pending",
      transactionId,
    });

    await newBooking.save();

    const newPayment = new Payment({
      user: req.user._id,
      booking: newBooking._id,
      amount: totalAmount,
      transactionId: transactionId,
      paymentStatus: "pending",
    });

    await newPayment.save();

    res.status(201).json({ success: "Booking created!", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("package", "packageName price duration");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAdminBookings = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate({
        path: "package",
        match: { createdBy: req.user._id }, 
        select: "packageName price",
      });

    const filteredBookings = bookings.filter((b) => b.package !== null); 

    res.status(200).json(filteredBookings);
  } catch (error) {
    console.error("Error fetching admin bookings:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const confirmBooking = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.status = "confirmed";
    await booking.save();

    res.status(200).json({ success: "Booking confirmed successfully!" });
  } catch (error) {
    console.error("Error confirming booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAdminNotifications = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    const notifications = await Booking.find({ status: "pending" })
      .populate("user", "name email")
      .populate("package", "packageName");

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



const cancelBooking = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
   
    const booking = await Booking.findOne({ user: req.user._id, status: { $ne: "cancelled" } });
    if (!booking) {
      return res.status(404).json({ error: "No active booking found" });
    }

    const payment = await Payment.deleteOne({ booking: booking._id });


    booking.status = "cancelled";
    booking.paymentStatus = "refunded";
    await booking.save();

    res.status(200).json({ success: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = { createBooking ,getUserBookings, getAdminBookings, confirmBooking, getAdminNotifications,cancelBooking };





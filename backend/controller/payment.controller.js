const Payment = require("../model/Payment");
const Booking = require("../model/Booking");

const getPaymentDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const payment = await Payment.findOne({ transactionId }).populate("booking", "package amountPaid").populate("booking.package", "packageName");

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment details:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const completePayment = async (req, res) => {
    try {
      const { transactionId, otp } = req.body;
  
      const payment = await Payment.findOne({ transactionId });
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
  
      if (otp !== "123456") {
        return res.status(400).json({ error: "Invalid OTP" });
      }
  
      payment.paymentStatus = "completed";
      await payment.save();
  
      const booking = await Booking.findById(payment.booking);
      if (booking) {
        booking.paymentStatus = "paid"; // ✅ Change to "paid"
        await booking.save();
      }
  
      res.status(200).json({ success: "Payment confirmed!" });
    } catch (error) {
      console.error("Error confirming payment:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("booking", "package amountPaid");
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching user payments:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    const payments = await Payment.find().populate("user", "name email").populate("booking", "package amountPaid");
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getPaymentDetails, completePayment, getUserPayments, getAllPayments };

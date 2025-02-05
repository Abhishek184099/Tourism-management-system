const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  numberOfPeople: { type: Number, required: [true, "Number of people is required"], min: 1 },
  bookingDate: { type: Date, required: [true, "Booking date is required"] },
  userName: { type: String, required: [true, "User name is required"] },
  userEmail: { type: String, required: [true, "User email is required"] },
  userPhone: { type: String, required: [true, "User phone number is required"] },
  userAddress: { type: String, required: [true, "User address is required"] },
  amountPaid: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending", "paid","refunded"], default: "pending" }, 
  transactionId: { type: String, unique: true, required: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;

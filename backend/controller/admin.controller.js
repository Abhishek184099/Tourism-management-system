const Booking = require("../model/Booking");
const Package = require("../model/Package");

const getAdminDashboardStats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    const adminPackages = await Package.find({ createdBy: req.user._id }).select("_id");

    const packageIds = adminPackages.map(pkg => pkg._id);

    const totalNumberOfPeople = await Booking.aggregate([
      { $match: { package: { $in: packageIds } } }, 
      { $group: { _id: null, total: { $sum: "$numberOfPeople" } } }
    ]);

    const totalBookings = await Booking.countDocuments({ package: { $in: packageIds } });

    const totalRevenue = await Booking.aggregate([
      { $match: { package: { $in: packageIds }, paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } }
    ]);

    res.status(200).json({
      totalNumberOfPeople: totalNumberOfPeople.length > 0 ? totalNumberOfPeople[0].total : 0,
      totalBookings,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAdminDashboardStats };

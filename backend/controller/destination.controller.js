const Destination = require("../model/Destination");

const addDestination = async (req, res) => {
  try {
    const { placeName, location, information, category } = req.body;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    if (!placeName || !location || !information || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imageUrls = req.files.map(file => file.path);

    const newDestination = new Destination({
      placeName,
      location,
      information,
      category,
      photos: imageUrls, 
      createdBy: req.user._id,
    });

    await newDestination.save();
    res.status(201).json({ success: "Destination added successfully!", destination: newDestination });

  } catch (error) {
    console.error("Error adding destination:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllDestinations = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { placeName: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    const destinations = await Destination.find(filter)
      .populate("reviews.user", "name email")
      .select("placeName location information category reviews photos");

    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDestinationDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findById(id)
      .populate({
        path: "reviews.user",
        select: "name email",
      })
      .populate({
        path: "createdBy",
        select: "name email",
      });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (error) {
    console.error("Error fetching destination details:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { placeName, location, information, category } = req.body;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    destination.placeName = placeName || destination.placeName;
    destination.location = location || destination.location;
    destination.information = information || destination.information;
    destination.category = category || destination.category;

    if (req.files && req.files.length > 0) {
      destination.photos = req.files.map(file => file.path);
    }

    await destination.save();
    res.status(200).json({ success: "Destination updated successfully!", destination });

  } catch (error) {
    console.error("Error updating destination:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    const destination = await Destination.findByIdAndDelete(id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.status(200).json({ success: "Destination deleted successfully!" });

  } catch (error) {
    console.error("Error deleting destination:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const addReview = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { rating, comment } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    if (!rating || !comment.trim()) {
      return res.status(400).json({ error: "Rating and comment are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5 stars." });
    }

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const newReview = {
      user: req.user._id,
      rating,
      comment,
    };

    destination.reviews.push(newReview);
    await destination.save();

    res.status(201).json({ success: "Review added successfully!", destination });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = { addDestination, getAllDestinations, getDestinationDetail, editDestination, deleteDestination,addReview };

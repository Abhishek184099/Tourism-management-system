const express = require("express");
const router = express.Router();
const { addDestination, getAllDestinations, addReview, getDestinationDetail,editDestination,deleteDestination } = require("../controller/destination.controller");
const { protectRoute } = require("../middleware/protectRoute");
const upload = require("../utils/multer");





router.post("/add", protectRoute, upload.array("pictures", 5), addDestination);

router.get("/", getAllDestinations);

router.get("/:id", protectRoute,getDestinationDetail);
router.post("/:destinationId/reviews", protectRoute, addReview);
router.put("/edit/:id", protectRoute, upload.array("photos", 5), editDestination);
router.delete("/:id", protectRoute, deleteDestination);




module.exports = router;

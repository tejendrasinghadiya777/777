const router = require("express").Router();

const {
  getItineraries,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getItinerary,
} = require("../controllers/itenaryController");
const validTokenHandler = require("../middlewares/validTokenHandler");
router.use(validTokenHandler);
router.route("/").get(getItineraries).post(createItinerary);
router
  .route("/:id")
  .get(getItinerary)
  .put(updateItinerary)
  .delete(deleteItinerary);

module.exports = router;

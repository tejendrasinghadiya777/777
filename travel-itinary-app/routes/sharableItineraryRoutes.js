const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const { getSharableTokenItineraryService } = require("../repository/itineraryService");
const Itinerary = require("../models/itineraryModel");
router.get('/:sharableToken', asyncHandler(async(req, res) => {
    const sharableToken = req.params.sharableToken;
    const itinerary = await getSharableTokenItineraryService(sharableToken);
    const obj = {};
    if(itinerary){
      const{ destination, startDate, endDate, activities,title} = itinerary;
        obj.title=title;
        obj.destination=destination;
        obj.startDate=startDate;
        obj.endDate=endDate;
        obj.activities=activities;
       
    }
     res.status(200).json(obj);
}));

module.exports = router;
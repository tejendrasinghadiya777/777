const asyncHandler = require("express-async-handler");
const cache = require("./itineraryCache");
const crypto = require('crypto');
const Itinerary = require("../models/itineraryModel");

const getItineraryService = asyncHandler(async (itineraryId) => {
    itineraryId = JSON.stringify(itineraryId);
    //console.log("Requested for id ",itineraryId);
    if(cache.has(itineraryId)){
        //console.log("Fetching from cache for id ",itineraryId);
        return JSON.parse(cache.get(itineraryId));
    }else{
        const itineraries = await Itinerary.findById(JSON.parse(itineraryId));
        cache.set(JSON.stringify(itineraryId),JSON.stringify(itineraries));
        return itineraries;
    }
});

const createItineraryService = asyncHandler(async (itineraryData) => {
    itineraryData.sharableToken=generateSharableToken();
    const itinerary = await Itinerary.create(itineraryData);
    //console.log("Storing in cache for id ",itinerary._id);
    cache.set(JSON.stringify(itinerary._id), JSON.stringify(itinerary));
    return itinerary;
});

const deleteItineraryService = asyncHandler(async (itineraryId) => {
    const itinerary = await Itinerary.findByIdAndDelete(itineraryId);
    if(itinerary){
        cache.del(JSON.stringify(itineraryId));
    }
    return itinerary;
}
);

const updateItineraryService = asyncHandler(async (itineraryId,itineraryData) => {
    itineraryData.sharableToken=generateSharableToken();
    const itinerary = await Itinerary.findByIdAndUpdate(itineraryId,itineraryData,{new:true});
    cache.set(JSON.stringify(itineraryId), JSON.stringify(itinerary));
    return itinerary;
});

const getSharableTokenItineraryService = asyncHandler(async (sharableToken) => {
        //console.log("Fetching itinerary for sharable token ",{sharableToken});
    return  await Itinerary.findOne({sharableToken});
      
});

const generateSharableToken = () => {
    return crypto.randomBytes(16).toString('hex');
}
module.exports = {
    getItineraryService,
    createItineraryService,
    deleteItineraryService,
    updateItineraryService,
    getSharableTokenItineraryService
}


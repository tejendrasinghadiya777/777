const asyncHandler = require("express-async-handler");
const Itinerary = require("../models/itineraryModel");
const { createItineraryService,getItineraryService,deleteItineraryService,updateItineraryService } = require("../repository/itineraryService");
//@desc get all tineraries
//@route GET /api/itineraries
//@access private
const getItineraries = asyncHandler(async (req, res) => {
  const { page,limit,sort,destination} = req.query;

  //data filtering
  let filter = {};
  filter.userId=req.user.id;
  if(destination){
    filter.destination=destination;
  }

  //sorting
  let sortingObj = {};
  const sortList = sort ? sort.split(",") : [];
  if (sortList.length) {
    sortList.forEach((sortItem) => {
      const order = sortItem.startsWith("-") ? -1 : 1;
      const field = sortItem.replace("-", "");
      if(field.trim()==="startDate" || field.trim()==="createdAt" || field.trim()==="title"){
      sortingObj[field] = order;
      }
    })}


  //pagination
  const currPage = parseInt(page, 10);
const dataLimit = parseInt(limit, 10);

// Assign default values if not provided or invalid
const currentPage = Number.isNaN(currPage) || currPage < 1 ? 1 : currPage;
const pageSize = Number.isNaN(dataLimit) || dataLimit < 1 ? 100 : dataLimit;

// Use currentPage and pageSize for pagination
const skip = (currentPage - 1) * pageSize;


  const itineraries = await Itinerary.find(filter).sort(sortingObj).skip(skip)
  .limit(pageSize);
  res.status(200).json(itineraries);
});

//@desc create Itinerary
//@route POST /api/itineraries
//@access private
const createItinerary = asyncHandler(async (req, res) => {
  req.body.userId=req.user.id;
  const { title, userId, destination, startDate, endDate } = req.body;
  if (!title || !userId || !destination || !startDate || !endDate) {
    res.status(400);
    throw new Error("All fields are mandatory !");
    //  res.json({message:"All fields are mandatory !"});
  }
//console.log("Creating new Itinerary",req.body);
  const itinerary = await createItineraryService(req.body);
  res.status(201).json(itinerary);
});

//@desc update Itinerary
//@route PUT /api/Itineraries/:id
//@access private
const updateItinerary = asyncHandler(async (req, res) => {
   const itinerary = await getItineraryService(req.params.id);
  if(!itinerary){
    res.status(404);
    throw new Error("Itinerary not found for id " + req.params.id);
  }
    //console.log("req.usrd.id",req.user.id);
    //console.log("itinerary.userId",itinerary.userId.toString());
  if(itinerary.userId.toString()!==req.user.id){
    res.status(403);
    throw new Error("User doesn't have permission to update this Itinerary");
  }
  const updatedItinerary = await updateItineraryService(req.params.id,req.body);
  res.status(202).json(updatedItinerary);
});
//@desc delete Itinerary
//@route DELETE /api/Itineraries/:id
//@access private
const deleteItinerary = asyncHandler(async (req, res) => {
   const itinerary = await getItineraryService(req.params.id);
   if(!itinerary){
    res.status(404);
    throw new Error("Itinerary not found for id " + req.params.id);
  }
  if(itinerary.userId.toString()!==req.user.id){
    res.status(403);
     throw new Error("User doesn't have permission to delete this Itinerary");
  }
  await deleteItineraryService(req.params.id);
    res.status(200).json({message:"Deleted Successfully"});

});
//@desc get Itinerary
//@route GET /api/Itinerarys/:id
//@access private
const getItinerary = asyncHandler(async (req, res) => {
  const itinerary = await getItineraryService(req.params.id);
  if(!itinerary){
    res.status(404);
     throw new Error("Itinerary not found for id " + req.params.id);
  }else{
      res.status(200).json(itinerary);
  }
});

module.exports = {
  getItineraries,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getItinerary,
};

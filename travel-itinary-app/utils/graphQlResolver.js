const {
  getItineraryService,
  createItineraryService,
  updateItineraryService,
  deleteItineraryService,
  getSharableTokenItineraryService,
} = require('../repository/itineraryService');
const Itinerary = require('../models/itineraryModel');

// Root resolver object
const resolvers = {
  // Queries
  itinerary: async ({ id }) => {
    return await getItineraryService(id);
  },
  itineraries: async () => {
    return await Itinerary.find();
  },
  sharableItinerary: async ({ token }) => {
    return await getSharableTokenItineraryService(token);
  },

  // Mutations
  createItinerary: async (args) => {
    return await createItineraryService(args);
  },
  updateItinerary: async ({ id, ...updateFields }) => {
    return await updateItineraryService(id, updateFields);
  },
  deleteItinerary: async ({ id }) => {
    await deleteItineraryService(id);
    return { message: "Deleted Successfully" };
  }
};

module.exports = resolvers;
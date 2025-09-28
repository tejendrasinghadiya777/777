const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
    time: { type: String, required: true },         
    description: { type: String, required: true },  
    location: { type: String, required: true }      
  },{ _id : false });
  
const itinerarySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: [true,"User id is not mentioned."],
    index: true,
    ref: 'User' },
  title: { type: String, 
    required: [true,"Title is required."],
    trim: true,
    maxlength: [500, "Title cannot be more than 500 characters"] },
  destination: { type: String, 
    required: [true,"Destination is required."],
    index:true
},
  startDate: { type: Date, 
    required: [true,"Start date is required."] },
  endDate: { type: Date, 
    required: [true,"End date is required."] },
  activities: [activitiesSchema],
sharableToken: { type: String, required:true, unique: [true,"Sharble token is always unique"], sparse: true }
}, {
  timestamps: true
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
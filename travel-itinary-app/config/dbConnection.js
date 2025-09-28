const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/travel_itinerary_db";
// const connectionString = 'mongodb://mongodb:27017/travel_itinerary_db';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || connectionString,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
        console.log("MongoDB connected successfully");
    }catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}

module.exports = connectDB;
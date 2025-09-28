const express = require('express');
const {errorHandler,jsonHandler} = require('./middlewares/errorHandler');
const ratelimiter = require('./middlewares/rateLimiter');



const app = express();

app.use(ratelimiter);
app.use(express.json());
app.use(jsonHandler);
app.use("/api/itineraries/share", require("./routes/sharableItineraryRoutes"));
app.use("/api/itineraries", require("./routes/itineraryRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));
app.use(errorHandler)

module.exports = app; // Export app for testing
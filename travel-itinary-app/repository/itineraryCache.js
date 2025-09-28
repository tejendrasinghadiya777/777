const nodeCache = require("node-cache");
const itineraryCache = new nodeCache({ stdTTL: process.env.CACHE_TTL_IN_SEC || 300, checkperiod: 120 });

module.exports = itineraryCache;
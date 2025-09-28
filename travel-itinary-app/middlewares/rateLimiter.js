const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS,10) || 1 * 60 * 1000, // in seconds
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS,10) || 100, // limit each IP to 100 requests per windowMs
  message: {
    message: "Too many requests, please try again later."
  }
});

module.exports = limiter;

parseInt(process.env.RATE_LIMIT_MAX_REQUESTS,10)
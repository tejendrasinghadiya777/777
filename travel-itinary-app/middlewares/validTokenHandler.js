const asyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
const accessTokenSecret = "my_seceret_key";

const validTokenHandler = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      const decoded = await jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET||accessTokenSecret,(err,decoded)=>{
        if(err) {
         res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        return decoded;
      })
      //console.log("Decoded token:", decoded);
      req.user = decoded;
      next();
    
  }
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
})

module.exports = validTokenHandler;
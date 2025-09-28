const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const accessTokenSecret = "my_seceret_key";

//@desc Register new user
//@route POST /api/auth/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory!");
  }
    //console.log("calling db");
    let usernameExists = await User.findOne({ username });
  if (usernameExists) {
     res.status(400);
    throw new Error("Username already exists.");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists.");
  }
  // Here you would typically add code to save the user to a database

  const hashedPassword = await bcrypt.hash(password, 10);
  //console.log("Hashed password:", hashedPassword);
   user = await User.create({ username, email, password: hashedPassword });
  //console.log("User registered:", user);
  res.status(201).json({ id:user._id,email:user.email });
});

//@desc login user
//@route POST /api/auth/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400)
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({username});
  if(!user){
    res.status(401)
    throw new Error("Invalid username");
  }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      res.status(401)
    throw new Error("Invalid password");
    }
  // Here you would typically add code to verify user credentials
  console.log("User logged in:", req.body);
  const accessToken= jsonwebtoken.sign({username:user.username,email:user.email,id:user._id},process.env.ACCESS_TOKEN_SECRET || accessTokenSecret,{expiresIn:"1500m"});
  res.status(200).json({accessToken});
});

//@desc current user info
//@route PUT /api/auth/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  
    console.log("Current user:", req.user);
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser
};

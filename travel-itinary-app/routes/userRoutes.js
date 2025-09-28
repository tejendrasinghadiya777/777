const router = require("express").Router();

const { registerUser,loginUser ,currentUser} = require("../controllers/userController");
const validTokenHandler = require("../middlewares/validTokenHandler");
router.post("/register", registerUser);

router.post("/login",loginUser );
router.post("/current",validTokenHandler, currentUser );

module.exports = router;
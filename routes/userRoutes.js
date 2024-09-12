const express = require("express");
const {registerUser, loginUser,currentUser }= require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router()


router.post("/register", registerUser)

router.post("/login", loginUser);
//required the (validateToken) like this if it's just for on route
router.get("/current",validateToken, currentUser);

module.exports = router
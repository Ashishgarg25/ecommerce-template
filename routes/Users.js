const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { signup, signin, updateUser, deleteUser } = require("../controllers/Users");

router.post("/createAccount", signup);
router.post("/signin", signin);
// router.get("/verification/:token", verifyEmail)
// router.post("/sendOtp", sendOTP);
// router.post("/verifyOtp", verifyOTP);
// router.put("/resetPassword", resetPassword)
router.put("/update", auth, updateUser);
router.delete("/delete", auth, deleteUser);

module.exports = router;
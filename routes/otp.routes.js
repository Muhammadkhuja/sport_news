const { createOtp, verifyOTP } = require("../controller/otp.controller");

const router = require("express").Router();

router.post("/createotp", createOtp)
router.post("/verifyotp", verifyOTP)


module.exports = router; 
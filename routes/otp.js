const express = require('express');
const { sendOtp, verifyOtp } = require('../controllers/otpFunctions');

const router = express.Router();

// Endpoint to send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const response = await sendOtp(email);
    if(response) {
      res.status(200).send('OTP sent successfully');
    } else {
      res.status(200).json({ result: "Email already registered" });
    }
  } catch (error) {
    res.status(500).send(`Error sending OTP: ${error.message}`);
  }
});

// Endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const isValid = await verifyOtp(email, otp);
    if (isValid) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).send(`Error verifying OTP: ${error.message}`);
  }
});

module.exports = router;
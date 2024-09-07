const { db } =  require('../firebase');
const { ref, get, set, remove } = require('firebase/database');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
});

// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP to email
const sendOtp = async (email) => {
  const otp = generateOtp();

  await set(ref(db, `otps/${email.replace('.', '_')}`), {
    otp,
    createdAt: new Date().toISOString(),
  });

  await transporter.sendMail({
    from: GOOGLE_USER,
    to: email,
    subject: "Email Verification for ARCANE'24",
    html: `<p>Your OTP code is ${otp}</p>`,
  });
};

// Verify OTP
const verifyOtp = async (email, enteredOtp) => {
  const otpRef = ref(db, `otps/${email.replace('.', '_')}`);
  const snapshot = await get(otpRef);

  if (!snapshot.exists()) {
    await remove(otpRef);
    return false;
  }

  const { otp } = snapshot.val();

  await remove(otpRef);

  if (otp === enteredOtp) {
    return true;
  } else {
    return false;
  }
};

module.exports = { sendOtp, verifyOtp };
const { realdb, db } =  require('../firebase');
const { ref, get, set, remove } = require('firebase/database');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { doc, getDoc } = require('firebase/firestore');

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

  const userDoc = doc(db, "registrations", email);
  const checkExistingUser = await getDoc(userDoc);

  if(checkExistingUser.exists()) {
    return false;
  }


  const otp = generateOtp();

  const otpEmailTemplate = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Arcane OTP Email Template</title><style>@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');</style></head><body style="background-color: #000000;"><center><table width="410" style="background-color: #000000;"><tr><td style="text-align: center; width: 100%;"><div style="height: 150px; width: 250px; margin: 20px auto;"><img src="https://i.postimg.cc/Wb0RhLkY/Arcan-logo-final.png" alt="logo" style="max-height: 100%; max-width: 100%;"></div><table style="background-color: #242529; border-top: 40px solid #a72767; border-radius: 8px 8px 0 0; margin-top: 20px; min-width: 100%; width: 100%;"><tr><td style="font-family: 'Poppins', sans-serif;"><h2 style="color: #D3D3D3; font-size: 16px; font-weight: 700; text-align: center; padding: 10px 22px; margin: 0;">Verification Code</h2><p style="text-align: center; letter-spacing: 1px; font-weight: bolder; font-size: 24px; font-family: 'Poppins', sans-serif; padding: 0 22px; color: #fff; margin: 0;">${otp}</p></td></tr></table><table style="background-color: #242529; padding-bottom: 30px; border-radius: 0 0 8px 8px; border-bottom: 10px solid #a72767; min-width: 100%; width: 100%;"><tr><td><p style="text-align: justify; letter-spacing: 1px; font-family: 'Poppins', sans-serif; text-align: center; font-size: 13px; padding: 0 11px; color: #969696;">Once your verification is complete, you’ll be able to register for technical and non-technical events.</p></td></tr></table><center><table style="background-color: #000000; padding: 10px 17px; min-width: 100%; width: 100%;"><td><div style="width: 20px; height: 20px; padding: 7px;"></div></td><td><div style="border-radius: 100%; width: 30px; height: 30px; border: 2px solid #a72767; padding: 8px;"><a href="https://www.instagram.com/arcane_2k24/" target="_blank"><img style="max-width: 100%; max-height: 100%; filter: brightness(0) invert(1);" src="https://i.postimg.cc/B6Dw5WpK/Instagram.png" alt="linkedin"></a></div></td><td></td><td><div style="border-radius: 100%; width: 30px; height: 30px; border: 2px solid #a72767; padding: 8px;"><a href="https://www.linkedin.com/school/crescentinstitute/" target="_blank"><img style="max-width: 100%; max-height: 100%; filter: brightness(0) invert(1);" src="https://i.postimg.cc/SRh1DZ1t/LinkedIn.png" alt="linkedin"></a></div></td><td></td><td><div style="border-radius: 100%; width: 30px; height: 30px; border: 2px solid #a72767; padding: 8px;"><a href="https://x.com/bsacrescentinst" target="_blank"><img style="max-width: 100%; max-height: 100%; filter: brightness(0) invert(1);" src="https://i.postimg.cc/W4dy3qJS/TwitterX.png" alt="linkedin"></a></div></td><td></td><td><div style="border-radius: 100%; width: 30px; height: 30px; border: 2px solid #a72767; padding: 8px;"><a href="https://www.youtube.com/c/BSACrescentInstitute" target="_blank"><img style="max-width: 100%; max-height: 100%; filter: brightness(0) invert(1);" src="https://i.postimg.cc/3wzcDrXh/YouTube.png" alt="linkedin"></a></div></td><td><div style="width: 20px; height: 20px; padding: 7x;"></div></td></table></center><center><table style="background-color: #000000; padding: 10px 17px; min-width: 100%; width: 100%;"><tr><td style="text-align: center;"><h4 style="color: #969696; font-size: 8px; letter-spacing: 1px; font-family: 'Poppins', sans-serif;">© 2024 B. S. Abdur Rahman Crescent Institute of Science and Technology</h4><h4 style="color: #969696; font-size: 8px; letter-spacing: 1px; font-family: 'Poppins', sans-serif; margin-top: -5px;">In case of queries, Contact arcane@crescent.education</h4><h5 style="color: #a72767; font-size: 8px; letter-spacing: 1px; font-family: 'Poppins', sans-serif; padding: 20px;">#ARCANE<span style="color: #FFFFFF; font-size: 8px; letter-spacing: 1px; font-family: 'Poppins', sans-serif;">'24</span></h5></td></tr></table></center></td></tr></table></center></body></html>`;

  await set(ref(realdb, `otps/${email.replace('.', '_')}`), {
    otp,
    createdAt: new Date().toISOString(),
  });

  await transporter.sendMail({
    from: process.env.GOOGLE_USER,
    to: email,
    subject: "Email Verification for ARCANE'24",
    html: otpEmailTemplate, 
  });

  return true;
};


// Verify OTP
const verifyOtp = async (email, enteredOtp) => {
  const otpRef = ref(realdb, `otps/${email.replace('.', '_')}`);
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
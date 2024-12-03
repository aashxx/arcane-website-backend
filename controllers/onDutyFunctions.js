const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const pdf = require('html-pdf');
require('dotenv').config();

const names = ["Mohamed Aashir"];
const colleges = ["Schedrix"];
const emails =["tmohamedaashir@gmail.com"];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
});

const sendEmailsforOD = async () => {
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const college = colleges[i];
        const email = emails[i];
        
        const qrData = `Email: ${email}, Category: ${college}`;
        const qrCodeImage = await QRCode.toDataURL(qrData);

        const emailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        
        <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: Arial, sans-serif;">
          <div style="width: 100%; max-width: 540px; margin: 0 auto; background-color: #fafafa; border-radius: 10px">
            <div style="width: 100%;">
              <table style="margin-top: 20px; width: 100%;">
                <tr>
                  <td style="font-family: 'Poppins', sans-serif;">
                    <div style="height: 120px; width: 150px; margin: 0 auto; margin-top: 50px;"> <img
                        src="https://i.postimg.cc/XJHJJDGN/Whats-App-Image-2024-10-04-at-11-41-52-removebg-preview-1.png"
                        alt="logo" style="max-height: 100%; width: 100%;"> </div>
                  </td>
                  <td style="font-family: 'Poppins', sans-serif;">
                    <div style="height: 120px; width: 200px; margin: 20px auto;"> <img
                        src="https://i.postimg.cc/2yFc0X3T/Whats-App-Image-2024-10-15-at-20-24-51.png"
                        alt="logo" style="max-height: 100%; max-width: 100%;"> </div>
                  </td>
                </tr>
              </table>
            </div>
            <div style="background-color: #0f1c3f; border-radius: 10px 10px 0 0; width: 100%; height: 45px;"></div>

        
            <!-- Body Content -->
            <div style="padding: 20px 30px; text-align: left; color: #333; background-color: white;">
              <p style="font-size: 16px; margin: 0 0 10px; font-weight: bold;">Greetings from Crescent Innovation and Incubation Council,</p>
              <p style="font-size: 16px; margin: 0 0 10px; text-align: justify;">We would like to extend our sincere thanks for confirming your participation in CIIC's 4th Demo Day 2024 happening on the 25th & 26th of October 2024. We are excited to have you join us and look forward to a successful event.</p>
              <p style="font-size: 16px; margin: 0 0 10px; text-align: justify;">This event provides an exciting opportunity to explore groundbreaking innovations, network with entrepreneurs, and gain insights into the latest trends in technology and business.
              </p>
              <p style="font-size: 16px; margin: 0 0 20px;">Your event pass is here.</p>
        
              <!-- Event Pass -->
              <table style="background-color: #fafafa; border-radius: 10px; border-top: 35px solid #861e1b;">
                <tr>
                  <td style="text-align: center; width: 100%;">
                    <table style="width: 100%;">
                      <tr>
                        <td style="font-family: 'Poppins', sans-serif;">
                          <div style="height: auto; width: 100%;"> <img
                              src="https://i.postimg.cc/rsH5J3rs/Whats-App-Image-2024-10-04-at-1-18-56-PM.jpg" alt="logo"
                              style="max-height: 100%; max-width: 100%;"> </div>
                        </td>
                      </tr>
                    </table>
                    <div style="background-color: #fafafa; padding: 20px;">
                      <table style="background-color: #defdff; margin-top: 20px; width: 100%; border-radius: 20px 20px 0 0;">
                        <tr>
                          <td style="font-family: 'Poppins', sans-serif;">
                            <div style="height: 120px; width: 200px; margin: 20px auto;"> <img
                                src="https://i.postimg.cc/2yFc0X3T/Whats-App-Image-2024-10-15-at-20-24-51.png"
                                alt="logo" style="max-height: 100%; max-width: 100%;"> </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        style="background-color: #defdff; padding: 0 15px; width: 100%; border-radius: 0 0 20px 20px;">
                        <tbody>
                          <tr>
                            <td
                              style="color: #000; text-transform: uppercase; font-weight: bold; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: bolder; font-size: 14px; height: 46px; width: 49%;">
                              <span>
                                <img style="height: 15px;" src="https://i.postimg.cc/PrNkWKMR/icons8-calendar-64.png" alt="AV">
                              </span>
                              <p style="font-size: 11px;">
                                25 & 26 October, 2024
                              </p>
                            </td>
                            <td></td>
                            <td
                              style="color: #000; text-transform: uppercase; font-weight: bold; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: bolder; font-size: 14px; height: 46px; width: 49%;">
                              <span>
                                <img style="height: 15px;" src="https://i.postimg.cc/vHjw39qH/icons8-location-pin-50.png"
                                  alt="AV">
                              </span>
                              <p style="font-size: 11px;">
                                CIIC Campus, Vandalur
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <table
                      style="background-color: #fafafa; padding-bottom: 30px; margin-bottom: 0; width: 100%; padding-bottom: 12px;">
                      <tr>
                        <td>
                          <p
                            style="text-align: justify; font-weight: bold; text-align: center; font-family: 'Poppins', sans-serif; font-size: 24px; color: #0f1c3f; line-height: 16px; margin-bottom: 0;">
                            ${name}</p>
                        </td>
                      </tr>
                    </table>
                    <table
                      style="background-color: #fafafa; padding-bottom: 30px; padding: 0 14px; width: 100%; margin-top: 0;">
                      <tbody>
                        <tr>
                          <td>
                            <img src="cid:qrCode" alt="QR Code" style="width: 150px; height: 150px; margin-top: 30px;" />
                          </td>
                        </tr>
        
                        <td
                          style="text-transform: uppercase; color: black; font-family: 'Segoe UI', sans-serif, serif; font-size: 12px; font-weight: lighter; letter-spacing: 4px; text-align: center;">
                          <p
                            style="color: #fff; font-weight: 700; background-color: #861e1b; text-align: center; padding: 20px 0; text-align: center; border-radius: 10px; margin-top: 20px; width: 90%; font-size: 24px; margin: 0 auto; margin-top: 20px;">
                            VISITOR</p>
                        </td>
                        <tr>
                          <td
                            style="color: black; font-family: 'Segoe UI', sans-serif, serif; font-size: 12px; font-weight: lighter; letter-spacing: 2px; text-align: center;">
                            <p
                              style="color: black; font-weight: 700; padding-bottom: 5px; text-align: center; margin: 0; margin-top: 4px; font-size: 16px;">
                              Crescent Innovation & Incubation Council
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="color: black; font-family: 'Segoe UI', sans-serif, serif; font-size: 12px; font-weight: lighter; letter-spacing: 2px; text-align: center;">
                            <p
                              style="color: black; font-weight: 700; padding-bottom: 5px; text-align: center; margin: 0; margin-top: 4px; font-size: 16px;">
                              Demo Day Pass
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
        
            <div>
              <table style="background-color: white; padding: 10px 17px; width: 100%;">
                <!-- LinkedIn Icon -->
                <td>
                  <div
                    style="background-color: #0077B5; border-radius: 100%; width: 40px; height: 40px; padding: 8px; margin: 0 auto;">
                    <a href="https://in.linkedin.com/company/ciicofficial">
                      <img src="https://i.postimg.cc/SRh1DZ1t/LinkedIn.png" alt="LinkedIn"
                        style="max-width: 100%; max-height: 100%;" />
                    </a>
                  </div>
                </td>
                <td></td>
                <!-- Instagram Icon -->
                <td>
                  <div
                    style="background-color: #E4405F; border-radius: 100%; width: 40px; height: 40px; padding: 8px; margin: 0 auto;">
                    <a href="https://www.instagram.com/ciicupdates/">
                      <img src="https://i.postimg.cc/B6Dw5WpK/Instagram.png" alt="Instagram"
                        style="max-width: 100%; max-height: 100%;" />
                    </a>
                  </div>
                </td>
                <td></td>
                <!-- YouTube Icon -->
                <td>
                  <div
                    style="background-color: #FF0000; border-radius: 100%; width: 40px; height: 40px; padding: 8px; margin: 0 auto;">
                    <a href="https://www.youtube.com/@ciicupdates">
                      <img src="https://i.postimg.cc/3wzcDrXh/YouTube.png" alt="YouTube"
                        style="max-width: 100%; max-height: 100%;" />
                    </a>
                  </div>
                </td>
                <td></td>
                <!-- Twitter (X) Icon -->
                <td>
                  <div
                    style="background-color: #1DA1F2; border-radius: 100%; width: 40px; height: 40px; padding: 8px; margin: 0 auto;">
                    <a href="https://x.com/ciicupdates/">
                      <img src="https://i.postimg.cc/W4dy3qJS/TwitterX.png" alt="Twitter"
                        style="max-width: 100%; max-height: 100%;" />
                    </a>
                  </div>
                </td>
              </table>
              <div style="width: 100%; background-color: white;">
                <table
                  style="width: 90%; padding: 0 25px; border: 2px solid #000; border-radius: 7px; margin: 0 auto;">
                  <tbody>
                    <tr>
                      <td
                        style="color: #000; text-transform: uppercase; font-weight: bold; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: bolder; font-size: 11px; height: 46px; min-width: 100px; width: 39%;">
                        <span>
                          <img style="height: 15px;" src="https://i.postimg.cc/3Rds7LgH/icons8-phone-50.png" alt="AV">
                        </span>
                        +919884282809
                      </td>
                      <td
                        style="color: #000; font-weight: bold; border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: bolder; font-size: 11px; height: 46px; min-width: 200px; width: 59%;">
                        <span>
                          <img style="height: 15px;" src="https://i.postimg.cc/rphBB6RJ/icons8-email-50.png" alt="AV">
                        </span>
                        info.ciic@crescent.education
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        
            <!-- Sponsors Section -->
            <div style="text-align: center; padding: 20px; background-color: white;">
              <h3 style="font-size: 18px; margin: 0 0 10px;">Our Sponsors</h3>
              <h5 style="font-size: 16px; margin: 0 0 10px; color: white; background-color: #0f1c3f; padding: 8px 0;">
                Platinum Sponsor
              </h5>
              <img src="https://i.postimg.cc/CMPGqL0p/IOB-Logo-1.png" alt="Gold Sponsor"
                style="width: 100px; margin: 10px;">
              <h5 style="font-size: 16px; margin: 0 0 10px; color: white; background-color: #0f1c3f; padding: 8px 0;">
                Gold Sponsor
              </h5>
              <img src="https://i.postimg.cc/N0C9yVTC/Sponsor-Poster.png" alt="Gold Sponsor"
                style="width: 100px; margin: 10px;">
              <h5 style="font-size: 16px; margin: 0 0 10px; color: white; background-color: #0f1c3f; padding: 8px 0;">
                Silver Sponsors
              </h5>
              <img src="https://i.postimg.cc/28nZH0R3/home-Denvik-Logo.png" alt="Bronze Sponsor"
                style="width: 100px; margin: 10px;">
              <img src="https://i.postimg.cc/zDbWhJxC/Sponsor-Poster-1.png" alt="Silver Sponsor"
                style="width: 100px; margin: 10px;">
                <img src="https://i.postimg.cc/k4s34cdV/INVITRO.jpg" alt="Silver Sponsor"
                style="width: 100px; margin: 10px;">
              <h5 style="font-size: 16px; margin: 0 0 10px; color: white; background-color: #0f1c3f; padding: 8px 0;">
                Bronze Sponsors
              </h5>
              <img src="https://i.postimg.cc/Dfg9hB2L/Whats-App-Image-2024-10-15-at-9-15-41-PM.png" alt="Gold Sponsor"
                style="width: 100%; margin: 10px;">
            </div>
        
            <!-- Footer Section -->
            <div
              style="background-color: #0f1c3f; padding: 10px; text-align: center; font-size: 12px; color: white; border-radius: 0 0 10px 10px;">
              <p style="margin: 5px 0;">Powered by <a href="#" style="color: #ab72fc; text-decoration: none;">Schedrix</a>
              </p>
            </div>
        
            <div>
              <table style="background-color: #fafafa; margin-top: 10px; padding: 10px 17px; width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <h4 style="color: #969696; font-size: 14px; letter-spacing: 1px; font-family: 'Poppins', sans-serif;">
                      © 2024 <span style="color: #861e1b;">CIIC</span>, in partnership with <span
                        style="color: #ab72fc;">Schedrix</span></h4>
                    <h4
                      style="color: #969696; font-size: 12px; letter-spacing: 1px; font-family: 'Poppins', sans-serif; margin-top: -5px;">
                      In case of queries, Contact industry4.ciic@crescent.education </h4>
                    <h5
                      style="color: black; font-size: 12px; letter-spacing: 1px; font-family: 'Poppins', sans-serif; padding: 20px;">
                      Powered by <span style="color: #ab72fc;">Schedrix</span>, CIIC Student Startup </h5>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </body>
        
        </html>
        `;

        const pdfContent = `
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #fafafa;
      font-family: Arial, sans-serif;
    }
    .container {
      width: 100%;
      max-width: 540px;
      margin: 0 auto;
      background-color: white;
      border-radius: 10px;
      padding: 20px 30px;
      text-align: left;
      color: #333;
      border-top: 35px solid #861e1b;
      border-bottom: 20px solid #861e1b;
      margin-top: 20px;
    }
    .header-logo {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    .header-logo img {
      max-width: 100%;
    }
    .event-info {
      background-color: #defdff;
      margin-top: 20px;
      padding: 15px;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .event-info td {
      font-family: 'Poppins', sans-serif;
      font-weight: bold;
      color: #000;
      text-transform: uppercase;
      text-align: center;
      font-size: 14px;
    }
    .qr-code-section {
      text-align: center;
      margin: 30px 0;
    }
    .qr-code-section img {
      width: 150px;
      height: 150px;
    }
    .visitor-badge {
      text-align: center;
      margin-top: 20px;
      background-color: #861e1b;
      color: white;
      font-weight: 700;
      font-size: 24px;
      padding: 20px;
      border-radius: 10px;
      width: 90%;
      margin: 0 auto;
      letter-spacing: 2px;
    }
    .footer-text {
      text-align: center;
      font-size: 16px;
      margin-top: 10px;
      color: black;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Logo -->
    <div class="header-logo">
      <img src="https://i.postimg.cc/rsH5J3rs/Whats-App-Image-2024-10-04-at-1-18-56-PM.jpg" alt="Logo" />
    </div>

    <!-- Event Info Section -->
    <div class="event-info">
    <table style="background-color: #defdff; margin-top: 20px; width: 100%; border-radius: 20px 20px 0 0;">
                        <tr>
                          <td style="font-family: 'Poppins', sans-serif;">
                            <div style="height: 120px; width: 200px; margin: 20px auto;"> <img
                                src="https://i.postimg.cc/2yFc0X3T/Whats-App-Image-2024-10-15-at-20-24-51.png"
                                alt="logo" style="max-height: 100%; max-width: 100%;"> </div>
                          </td>
                        </tr>
                      </table>
      <table style="width: 100%;">
        <tr>
          <td>
            <span><img style="height: 15px;" src="https://i.postimg.cc/PrNkWKMR/icons8-calendar-64.png" alt="Date"></span>
            <p style="font-size: 11px;">25 & 26 October, 2024</p>
          </td>
          <td>
            <span><img style="height: 15px;" src="https://i.postimg.cc/vHjw39qH/icons8-location-pin-50.png" alt="Location"></span>
            <p style="font-size: 11px;">CIIC Campus, Vandalur</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Name Section -->
    <div style="text-align: center; margin: 20px 0;">
      <p style="font-size: 24px; font-family: 'Poppins', sans-serif; color: #0f1c3f; font-weight: bold;">${name}</p>
    </div>

    <!-- QR Code Section -->
    <div class="qr-code-section">
      <img src="${qrCodeImage}" alt="QR Code" />
    </div>

    <!-- Visitor Badge -->
    <div class="visitor-badge">
      VISITOR
    </div>

    <!-- Footer Text -->
    <div class="footer-text">
      <p>Crescent Innovation & Incubation Council</p>
      <p>Demo Day Pass</p>
    </div>
    <div>
              <table style="background-color: #fff; margin-top: 10px; padding: 10px 17px; width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <h4 style="color: #969696; font-size: 14px; letter-spacing: 1px; font-family: 'Poppins', sans-serif;">
                      © 2024 <span style="color: #861e1b;">CIIC</span>, in partnership with <span
                        style="color: #ab72fc;">Schedrix</span></h4>
                    <h4
                      style="color: #969696; font-size: 12px; letter-spacing: 1px; font-family: 'Poppins', sans-serif; margin-top: -5px;">
                      In case of queries, Contact industry4.ciic@crescent.education </h4>
                    <h5
                      style="color: black; font-size: 12px; letter-spacing: 1px; font-family: 'Poppins', sans-serif; padding: 20px;">
                      Powered by <span style="color: #ab72fc;">Schedrix</span>, CIIC Student Startup </h5>
                  </td>
                </tr>
              </table>
            </div>
  </div>
</body>
</html>
`;

        const options = { format: 'A4', orientation: 'portrait' };
        const pdfPath = `./output_${name}.pdf`;

        await new Promise((resolve, reject) => {
            pdf.create(pdfContent, options).toFile(pdfPath, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });

        try {
            await transporter.sendMail({
                from: process.env.GOOGLE_USER,
                to: email,
                cc: "media.ciic@crescent.education",
                subject: "CIIC 4th Mega Demo Day Confirmation",
                html: emailTemplate,
                attachments: [
                    {
                        filename: 'qr-code.png',
                        content: qrCodeImage.split(",")[1],
                        encoding: 'base64',
                        cid: 'qrCode'  // Embedded QR code image
                    },
                    {
                        filename: `Event_Pass_${name}.pdf`, // Attach the generated PDF
                        path: pdfPath
                    }
                ]
            });
            console.log(`Email sent successfully to ${name} (${email})`);
        } catch (error) {
            console.error(`Failed to send email to ${name} (${email}): ${error.message}`);
        }
    }
};

module.exports = { sendEmailsforOD };


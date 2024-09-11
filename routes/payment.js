const express = require('express');
const multer = require('multer');
const { writeToDatabase, sendAffirmationEmail } = require('../controllers/paymentFunctions');

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const router = express.Router();

router.post('/apply-request', upload.single('transactionScreenshot'), async (req, res) => {

  const { participant, transactionId, amount, transactionDate } = req.body;
  
  try {
    const parsedParticipant = JSON.parse(participant);
    const transaction = {
      transactionId,
      amount,
      transactionDate,
      transactionScreenshot: req.file.buffer  
    };
    await writeToDatabase(parsedParticipant, transaction);
    await sendAffirmationEmail(parsedParticipant);
    res.status(200).send('Recorded successfully');
  } catch (error) {
    console.error('Error processing payment request:', error);
    res.status(500).send(`Error recording participant: ${error.message}`);
  }
});

module.exports = router;

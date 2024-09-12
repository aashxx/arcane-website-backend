const express = require('express');
const { sendAffirmationEmail } = require('../controllers/paymentFunctions');
const router = express.Router();

router.post('/apply-request',  async (req, res) => {

  const { participant } = req.body;
  
  try {
    await sendAffirmationEmail(participant);
    res.status(200).send('Recorded successfully');
  } catch (error) {
    console.error('Error processing payment request:', error);
    res.status(500).send(`Error recording participant: ${error.message}`);
  }
});

module.exports = router;

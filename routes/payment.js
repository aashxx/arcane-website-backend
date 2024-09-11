const express = require('express');
const { writeToDatabase, sendAffirmationEmail } = require('../controllers/paymentFunctions');

const router = express.Router();

router.post('/apply-request', async (req, res) => {
  const { participant, transaction } = req.body;
  try {
    await writeToDatabase(participant, transaction);
    await sendAffirmationEmail(participant);
    res.status(200).send('Recorded successfully');
  } catch (error) {
    res.status(500).send(`Error recording participant: ${error.message}`);
  }
});

module.exports = router;


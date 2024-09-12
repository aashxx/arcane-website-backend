const express = require('express');
const { writeToFirestore, sendEventConfirmation, sendEventRejection } = require('../controllers/confirmationFunctions');
const { writeParticipantData } = require('../controllers/sheetFunctions');

const router = express.Router();

router.post('/confirm-registration', async (req, res) => {
  const { participant } = req.body;
  try {
    await writeToFirestore(participant);
    await writeParticipantData(participant);
    await sendEventConfirmation(participant);
    res.status(200).send('Registered successfully');
  } catch (error) {
    res.status(500).send(`Error registering participant: ${error.message}`);
  }
});

router.post('/reject-registration', async (req, res) => {
  const { participant } = req.body;
  try {
    await sendEventRejection(participant);
    res.status(200).send('Rejected successfully');
  } catch (error) {
    res.status(500).send(`Error rejecting participant: ${error.message}`);
  }
});

module.exports = router;
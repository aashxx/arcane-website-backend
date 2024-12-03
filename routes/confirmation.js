const express = require('express');
const { writeToFirestore, sendEventConfirmation, sendEventRejection, sendEmail } = require('../controllers/confirmationFunctions');
const { writeParticipantData } = require('../controllers/sheetFunctions');
const { sendEmailsforOD } = require('../controllers/onDutyFunctions');

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

router.get('/onduty-email', async (req, res) => {
  try {
    await sendEmailsforOD();
    res.status(200).send('Sent successfully');
  } catch (error) {
    res.status(500).send(`Error rejecting participant: ${error.message}`);
  }
});

router.post('/send-email', async (req, res) => {
  const { productData, reciever } = req.body;
  try {
    await sendEmail(productData, reciever);
    res.status(200).send('Sent successfully');
  } catch (error) {
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

module.exports = router;
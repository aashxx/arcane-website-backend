const { google } = require('googleapis');
const { getAuthClient } = require('../googleapi'); 
const dotenv = require('dotenv');

dotenv.config();

const spreadsheetId = process.env.GOOGLE_SHEET_ID; 

const appendDataToSheet = async (auth, range, values) => {
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [values],
    },
  };
  try {
    const result = await sheets.spreadsheets.values.append(request);
    return result.data;
  } catch (err) {
    console.error(`Error appending data to ${range}:`, err);
    throw err;
  }
}

const writeParticipantData = async (participant) => {
  const auth = await getAuthClient();
  const rowData = [
    participant.fullName,
    participant.college,
    participant.email,
    participant.phone,
    participant.degree,
    participant.year,
    participant.food,
    participant.events.join(', '), 
    participant.timestamp
  ];

  await appendDataToSheet(auth, 'Overall!A1:H1', rowData);

  if (participant.food !== "No") {
    const foodData = [
      participant.fullName,
      participant.college,
      participant.email,
      participant.phone,
      participant.degree,
      participant.year,
      participant.food,
    ];
    await appendDataToSheet(auth, 'Food!A1:G1', foodData);
  }

  for (const event of participant.events) {
    const eventData = [
      participant.fullName,
      participant.college,
      participant.email,
      participant.phone,
      participant.degree,
      participant.year,
    ];
    await appendDataToSheet(auth, `${event}!A1:F1`, eventData);
  }
}

module.exports = { writeParticipantData };
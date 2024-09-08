const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const getAuthClient = async () => {

    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    const auth = await google.auth.getClient({
        credentials: {
          client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY
        },
        scopes: SCOPES,
    });

    return auth;
}

module.exports = { getAuthClient };
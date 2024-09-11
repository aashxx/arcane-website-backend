const { initializeApp } = require('firebase/app');
const { getFirestore } = require("firebase/firestore");
const { getDatabase } = require('firebase/database');
const { getStorage } = require('firebase/storage');
const dotenv = require('dotenv');

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const realdb = getDatabase(app);
const storage = getStorage(app);

module.exports = { app, db, realdb, storage };
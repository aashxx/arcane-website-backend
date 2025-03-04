const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors());

app.use('/api/otp', require('./routes/otp.js'));
app.use('/api/payment', require('./routes/payment.js'));
app.use('/api/registration', require('./routes/confirmation.js'));

app.get('/', (req, res) => {
    res.send("Arcane 24");
});

app.listen(PORT, () => {
    console.log("App listening at port", PORT);
});
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/verify-email', require('./routes/otp.js'));

app.get('/', (req, res) => {
    res.send("Arcane 24");
});

app.listen(PORT, () => {
    console.log("App listening at port", PORT);
});
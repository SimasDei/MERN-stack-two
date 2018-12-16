const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Database Configuration
const db = require('./config/keys').mongoURI;
// Connect to MongoDB through Mongoose
mongoose
  .connect(db)
  .then(() => console.log('Connection Established, Captain!'))
  .catch(err => console.log("It's Dead, Jim :( ", err));

app.get('/', (req, res) => {
  res.send('Ahoy Sailor o/');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

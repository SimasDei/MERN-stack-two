const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

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

// Assign routes to Express
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

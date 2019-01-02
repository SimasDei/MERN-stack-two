const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Using /build fr deployment
app.use( express.static( `${__dirname}/../build` ) );

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Configuration
const db = require('./config/keys').mongoURI;
// Connect to MongoDB through Mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connection Established, Captain!'))
  .catch(err => console.log("It's Dead, Jim :( ", err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Assign routes to Express
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

// Establish endpoint for porduction Build
const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const messages = require('./routes/api/messages');
const photo = require('./routes/api/photo');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/messages', messages);
app.use('/api/photo', photo);

const PORT = process.env.PORT || 5000;

app.post('/', (req, res) => {
  res.send('hello world from social media app');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

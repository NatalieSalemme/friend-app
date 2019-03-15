const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const messages = require('./routes/api/messages');
const photo = require('./routes/api/photo');

const app = express();

const multer = require('multer');
const upload = multer({
  dest: 'images',
});
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send(res);
});

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    }
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.post('/', (req, res) => {
  res.send('hello world from social media app');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

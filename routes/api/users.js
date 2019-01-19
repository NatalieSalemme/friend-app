const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//Load User model
const User = require('../../models/User');
router.get('/test', (req, res) => {
  res.json({ msg: 'Users works' });
});

//@route GET api/users/register
//@desc  Register user
//access Public

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    //if user already exists
    if (user) {
      return res.status(400).json({ email: 'This email already exists' });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      //salt the password
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route GET api/users/login
//@desc  Register user
//access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        return res.json({ msg: 'Success' });
      } else {
        //message to be sent on the client
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;

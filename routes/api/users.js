const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const _ = require('lodash');
const multer = require('multer');
const sharp = require('sharp');
//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//Load User model
const User = require('../../models/User');
router.get('/test', (req, res) => {
  res.json({ msg: 'Users works' });
});

//@route GET api/users/register
//@desc  Register user
//access Public

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    //if user already exists
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
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
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        //Create JWT payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        //Sign token
        //(payload, secret, expiration, callback)
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 9000 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        //message to be sent on the client
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET api/users/current
//@desc  Return curent user
//access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// //@route Post api/users/current
// //@desc  Return curent user
// //access Private
// router.post(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json(req.user);
//   }
// );

//@route POST api/users/edit-account
//@desc  Update current username
//access Private
router.post(
  '/edit-account',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let password = req.body.password;

    bcrypt.hash(password, 10, function(err, hash) {
      let userFields = {};

      userFields.password = hash;
      userFields.password2 = hash;

      userFields.name = req.body.name;
      userFields.email = req.body.email;

      User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true },
        function(err, Event) {
          if (err) throw err;
          res.json({ event: Event });
        }
      );
    });
  }
);

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  },
});

//@route POST api/users/me/avatar
//@desc  Update users avatar
//access Private
router.post(
  '/me/avatar',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  '/me/avatar',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  }
);

router.get('/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});
module.exports = router;

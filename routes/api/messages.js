const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Message = require('../../models/Message');
const User = require('../../models/User');
//Validation
const validateMessageInput = require('../../validation/message');

//@route POST api/messages
//@desc  Create message
//access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = new Message({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
      to: req.body.to,
    });
    newMessage.save().then(message => res.json(message));
  }
);

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(user => {
      if (user) {
        // res.json({ user: user });
        Message.find({ to: req.user.id }).then(message => res.json(message));
      } else {
        res.status(404).json({ error: 'No user found' });
      }
    });
  }
);
module.exports = router;

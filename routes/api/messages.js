const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Message = require('../../models/Message');

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
    });
    newMessage.save().then(message => res.json(message));
  }
);

module.exports = router;

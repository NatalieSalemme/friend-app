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
      message: req.body.message,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
      to: req.body.to,
      from: req.user.name,
    });
    newMessage.save().then(message => res.json(message));
    res.json(req.user);
  }
);
//@route GET api/messages/all
//@desc  Get all messages
//access Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(user => {
      if (user) {
        // res.json({ user: user });
        Message.find({ to: req.user.id }).then(messages => res.json(messages));
      } else {
        res.status(404).json({ error: 'No user found' });
      }
    });
  }
);
//@route Delete api/messages/delete/:id
//@desc  Delete message
//access Private
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // res.json(req.params.id);
    Message.findById(req.params.id)
      .then(message => {
        //Delete
        message.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ messagenotfound: 'No message found' })
      );
  }
);
//@route GET api/messages/reply/:message_id
//@desc  Reply to message thread
//access Private
router.get(
  '/reply/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Message.findById(req.params.id)
      .then(message => res.json(message))
      .catch(err =>
        res
          .status(404)
          .json({ nomessagefound: 'No message found with that id' })
      );
  }
);
module.exports = router;

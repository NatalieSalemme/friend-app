const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const Photo = require('../../models/Photo');
const User = require('../../models/User');
// @route   POST api/photo/edit-photo
// @desc    Post avatar photo
// @access  Private
router.post(
  '/edit-photo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(res);
    // User.findOne({ id: req.body._id }).then(user => {
    //   res.json(user);
    // });
  }
);

module.exports = router;

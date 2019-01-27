const express = require('express');
const router = require('router');
const mongoose = require('mongoose');
const passport = require('passport');
const Photo = require('../../models/Photo');
const User = require('../../models/User');

router.get(
  '/edit-photo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ id: req.body._id }).then(user => {
      res.json(user);
    });
  }
);

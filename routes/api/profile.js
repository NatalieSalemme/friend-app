const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validatePostInput = require('../../validation/post');
//Load Profile model
const Profile = require('../../models/Profile');
//Load user profile
const User = require('../../models/User');

//@route GET api/profile/browse
//@desc  Get profiles that do not include current user or current users friends
//access Public
router.get('/browse', (req, res) => {
  const errors = {};
  Profile.find({})
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json();
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

//@route GET api/profile/handle/:handle
//@desc  Get profile by handle
//access Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/profile/user/:user_id
//@desc  Get profile by user id
//access Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

//@route POST api/profile
//@desc  Create or edit user profile
//access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    } else {
      //Get user fields
      const userFields = {};
      userFields.user = req.user.id;
      if (req.body.handle) userFields.handle = req.body.handle;
      //Get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      profileFields.name = req.user.name;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.hobbies) profileFields.hobbies = req.body.hobbies;
      if (req.body.bio) profileFields.bio = req.body.bio;

      //CSV to split into array
      if (typeof req.body.hobbies !== 'undefined') {
        profileFields.hobbies = req.body.hobbies.split(', ');
      }
      if (typeof req.body.bucketlist !== 'undefined') {
        profileFields.bucketlist = req.body.bucketlist.split(', ');
      }

      //Social
      profileFields.social = {};
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;

      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (profile) {
            //Update

            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            ).then(profile => res.json(profile));
          } else {
            //Check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }

              //Save profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            });
          }
        })
        .catch(err =>
          res.status(404).json({ updateError: 'Unable to update profile' })
        );
    }
  }
);

//@route POST api/profile/experience
//@desc  Add experience to profile
//access Private

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
      };
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route POST api/profile/education
//@desc  Add education to profile
//access Private

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        major: req.body.major,
        year: req.body.year,
      };
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE api/profile/experience/:exp_id
//@desc  Delete experience from profile
//access Private

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        //Splice out of array
        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route DELETE api/profile/education/:edu_id
//@desc  Delete experience from profile
//access Private

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        //Splice out of array
        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
//@route DELETE api/profile
//@desc  Delete user and profile
//access Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

//@route GET api/profile
//@desc  Get current users profile
//access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      //populate fields from users object
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route GET api/profile/:handle/comments
//@desc  Get all comments on a users profile
//access Private
router.get(
  '/:handle/comments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ handle: req.params.handle })
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);
//@route POST api/profile/:handle/comments
//@desc  Post a comment to a users profile
//access Private
router.post(
  '/:handle/comments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ handle: req.params.handle })
      .then(profile => {
        const { errors, isValid } = validatePostInput(req.body);

        //check validation
        if (!isValid) {
          //if any errors, send 400 with errors object
          return res.status(400).json(errors);
        }
        const newComment = new Post({
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
          user: req.user.id,
        });
        profile.comments.unshift(newComment);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ commentnotfound: 'No comment found' })
      );
  }
);
//@route DELETE api/profile/:handle/comments/:id
//@desc  Delete comment from profile
//access Private

router.delete(
  '/:handle/comments/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({
      handle: req.params.handle,
    }).then(profile => {
      const removeIndex = profile.comments
        .map(comment => comment.id)
        .indexOf(req.params.id);
      //Splice out of array
      profile.comments.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    });
  }
);
//@route POST api/profile/:handle/comments/like/:id
//@desc  Post like on profile comment
//access Private
router.post(
  '/:handle/comments/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({
      handle: req.params.handle,
    }).then(profile => {
      const commentIndex = profile.comments
        .map(comment => comment.id)
        .indexOf(req.params.id);

      if (
        profile.comments[commentIndex].likes.filter(
          like => like.user.toString() === req.user.id
        ).length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: 'User already liked this comment' });
      }
      // Add user id to likes array
      profile.comments[commentIndex].likes.unshift({ user: req.user.id });

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route POST api/profile/:handle/comments/unlike/:id
//@desc  Unlike profile comment
//access Private

router.post(
  '/:handle/comments/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({
      handle: req.params.handle,
    })
      .then(profile => {
        const commentIndex = profile.comments
          .map(comment => comment.id)
          .indexOf(req.params.id);
        if (
          profile.comments[commentIndex].likes.filter(
            like => like.user.toString() === req.user.id
          ).length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this profile comment' });
        }
        profile.comments[commentIndex].likes.splice(commentIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

//@route POST api/profile/friendrequests/to/:handle
//@desc  Send a friend request to a user
//access Private
router.post(
  '/friendrequests/to/:handle',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ handle: req.params.handle })
      .then(profile => {
        // res.json(req.user.id, profile.user);

        if (profile.user == req.user.id) {
          return res.status(400).json({
            cannotBeFriendsWithYourself: 'You cannot be friends with yourself',
          });
        }
        if (
          profile.friends.filter(
            friend => friend.user.toString() === req.user.id
          ).length > 0
        ) {
          return res.status(400).json({
            alreadyFriends: 'You are already friends with this user',
          });
        }

        if (
          profile.friendrequests.filter(
            friend => friend.user.toString() === req.user.id
          ).length > 0
        ) {
          return res.status(400).json({
            alreadyFriendRequested:
              'You already have a pending friend request for this user',
          });
        }
        const requester = {
          user: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar,
        };
        profile.friendrequests.unshift(requester);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({
          friendrequesterror: 'Error sending friend request, please try again',
        })
      );
  }
);
//@route GET api/profile/friendrequests/to/me
//@desc  Get friend requests for a user
//access Private
// router.get(
//   '/friendrequests/to/me',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       res.json(profile);
//     });
//   }
// );

//@route Delete api/profile/friendrequests/to/me/:requestId
//@desc  Delete a friend request
//access Private
router.delete(
  '/friendrequests/to/me/:requestId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.friendrequests
          .map(request => request.id)
          .indexOf(req.params.requestId);
        //Splice out of array
        profile.friendrequests.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ requestnotfound: 'No friend request found' })
      );
  }
);

//@route POST api/profile/friendrequests/to/me/:requestId/:futureFriendId
//@desc  Accept a friend request
//access Private

router.post(
  '/friendrequests/to/me/:requestId/:futureFriendId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const findIndex = profile.friendrequests
          .map(request => request.id)
          .indexOf(req.params.requestId);
        const friendInfo = profile.friendrequests[findIndex];
        if (friendInfo) {
          profile.friends.unshift(friendInfo);
          profile.friendrequests.splice(findIndex, 1);
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err =>
        res.status(404).json({ requestnotfound: 'No friend request found' })
      );
  }
);

//@route POST api/profile/friendrequests/accept/:futureFriendId
//@desc  After a friend request is accepted, it adds current users name to future friends profile's friends list
//access Private

router.post(
  '/friendrequests/accept/:futureFriendId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.params.futureFriendId })
      .then(profile => {
        const requester = {
          user: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar,
        };
        profile.friends.unshift(requester);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({
          friendrequesterror: 'Error adding your name to your friends list',
        })
      );
  }
);

//@route GET api/profile/filter/:name
//@desc  After a friend request is accepted, it adds current users name to future friends profile's friends list
//access Public
router.get('/filter/:name', (req, res) => {
  User.find().then(users => {
    let userIds = [];
    users.forEach(user => {
      if (
        (user.name,
        user.name.toLowerCase().includes(req.params.name.toLowerCase()))
      ) {
        userIds.push(user._id.toString());
      }
    });
    // console.log(userIds);
    Profile.find().then(profiles => {
      let emptyProfs = [];
      profiles.forEach(profile => {
        let stringifiedId = profile.user.toString();
        if (userIds.includes(stringifiedId)) {
          emptyProfs.push(profile);
        }
      });

      if (emptyProfs.length == 0) {
        res
          .status(404)
          .json({ noprofilesfound: 'There were no profiles found' });
      } else {
        res.send(emptyProfs);
      }
    });
  });
});

//@route POST api/profile/updateAvatarStatus
//@desc  Update avatar status in Profile model setting it to true
//access Private
router.post(
  '/updateAvatarStatus',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      profile.hasOwnAvatar = true;
      profile.save().then(profile => res.json(profile));
    });
  }
);
module.exports = router;

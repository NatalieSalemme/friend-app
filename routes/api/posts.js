const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
//Validation
const validatePostInput = require('../../validation/post');

//@route GET api/post
//@desc  Get posts
//access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let emptyArr = [];
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.find()
          .sort({ date: -1 })
          .then(post => {
            let friendIds = [];
            profile.friends.map(friend => {
              friendIds.push(JSON.stringify(friend.user));
            });
            friendIds.unshift(JSON.stringify(req.user.id));
            let myId = JSON.stringify(req.user.id);
            console.log(friendIds);
            let postList = [];
            post.forEach(p => {
              let user = JSON.stringify(p.user);

              if (friendIds.includes(user) || p.user === myId) {
                postList.push(p);
              }
            });
            res.json(postList);
          });
      })
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  }
);

//@route GET api/post/:id
//@desc  Get posts by id
//access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that Id' })
    );
});

//@route POST api/posts
//@desc  Create post
//access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE api/post/:id
//@desc  Delete post
//access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized ' });
          }
          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);
//@route POST api/posts/like/:id
//@desc  Like post
//access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

//
//@route POST api/posts/unlike/:id
//@desc  Unlike post
//access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          //Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          //Splice out of array
          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);
//@route POST api/posts/comment/:id
//@desc  Add comment to post
//access Private

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    // Profile.findOne({ user: req.user.id }).then(profile => res.json(profile));
    Post.findById(req.params.id)
      .then(post => {
        let hasAvatar;
        if (req.user.avatar) {
          hasAvatar = true;
        } else {
          hasAvatar = false;
        }
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: hasAvatar,
          user: req.user.id,
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

//@route POST api/posts/like/:postId/:commentId
//@desc  Like comment on post
//access Private

router.post(
  '/like/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findOne({ _id: req.params.postId }).then(post => {
        let index = post.comments.findIndex(x => x.id === req.params.commentId);

        post.comments[index].likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      });
    });
  }
);

//@route POST api/posts/unlike/:postId/:commentId
//@desc  Unike comment on post
//access Private

router.post(
  '/unlike/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.postId)
        .then(post => {
          let index = post.comments.findIndex(
            x => x.id === req.params.commentId
          );

          if (
            post.comments[index].likes.filter(
              like => like.user.toString() === req.user.id
            ).length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          //Get remove index
          const removeIndex = post.comments[index].likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          //Splice out of array
          post.comments[index].likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
    // Profile.findOne({ user: req.user.id }).then(profile => {
    //   Post.findOne({ _id: req.params.postId }).then(post => {
    //     let index = post.comments.findIndex(x => x.id === req.params.commentId);
    //
    //     post.comments[index].likes.unshift({ user: req.user.id });
    //
    //     post.save().then(post => res.json(post));
    //   });
    // });
  }
);
module.exports = router;

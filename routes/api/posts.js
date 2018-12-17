const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');
// Profile Model
const Profile = require('../../models/Profile');
// Post Validation Function
const validatePostInput = require('../../validation/post');

//@route GET api/post/test
//@desc Get request to test post Route
//@access Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'hell yeah ! From Posts'
  });
});

//@route GET api/posts
//@desc Get a post Sort by Date Descending
//@access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'There are no posts' }));
});

//@route GET api/posts
//@desc Get a post By Id
//@access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post with the id provided' })
    );
});

//@route POST api/posts
//@desc Create a Post
//@access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If there were any errors, respond with 400
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route PUT api/posts/:id
//@desc Update a Post
//@access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check vaidation
    if (!isValid) {
      //if any errors send 404
      return res.status(400).json(errors);
    }
    Post.findByIdAndUpdate({ _id: req.params.id })
      .then(post => {
        //check post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'User not authorizated' });
        }
        post.text = req.body.text;

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

//@route DELETE api/posts/:id
//@desc Delete a Post
//@access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check if post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete the post
          post
            .remove()
            .then(() => res.json({ success: true }))
            .catch(err =>
              res.status(404).json({ postnotfound: 'Post was not found' })
            );
        })
        .catch(err => {
          res.status(404).json({ nopostfound: 'No post was found' });
        });
    });
  }
);

module.exports = router;

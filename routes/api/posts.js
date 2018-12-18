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

//@route POST api/posts/like/:id
//@desc Like a Post
//@access Private
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
              .json({ alreadyLiked: 'User already liked this post' });
          }

          // Add user id to likes const likes array
          post.likes.push({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ nopostfound: 'No post was found' });
        });
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc Remove a like from a post
//@access Private
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
              .json({ notLiked: 'You have not liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice it out of the array
          post.likes.splice(removeIndex, 1);

          // Save
          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.status(404).json({ success: false }));
        })
        .catch(err => {
          res.status(404).json({ nopostfound: 'No post was found' });
        });
    });
  }
);

// @route POST api/posts/comment/:id
// @desc Add comment to post
// @ Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check Validation
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      // If errors: Send 400
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to Comments array
        post.comments.unshift(newComment);
        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: 'Post not found' }));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete a comment from the post
// @ Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ noComment: 'Comment does not exist' });
        }

        // Get remove Index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice the comment out of the array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: 'Post not found' }));
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();

//@route GET api/post/test
//@desc Get request to test post Route
//@access Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'hell yeah ! From Posts'
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

//@route GET api/profile/test
//@desc Get request to profile post Route
//@access Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'hell yeah ! from Profile'
  });
});

module.exports = router;

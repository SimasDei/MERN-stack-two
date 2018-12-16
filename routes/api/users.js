const express = require('express');
const router = express.Router();

//@route GET api/users/test
//@desc Get request to test users Route
//@access Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'hell yeah ! From Users'
  });
});

module.exports = router;

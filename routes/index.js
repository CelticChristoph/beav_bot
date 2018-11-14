const express = require('express');

const router = express.Router();

// GET home page.
router.get('*', (req, res) => {
  // res.render('index');
  res.status(200);
  res.json({
    message: 'Boo',
  });
});

module.exports = router;

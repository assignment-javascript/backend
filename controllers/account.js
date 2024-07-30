// controllers/account.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/accountModel');

router.post('/income', (req, res) => {
  res.send('Hello World!');
});

router.post('/export', (req, res) => {
  res.send('Hello World!');
});

router.get('/report', (req, res) => {
  const month = req.query.month;

  if (!month) {
    return res.status(400).send('Month query parameter is required');
  }
  userModel.getUsersByMonth(month, (error, rows) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Server error');
      return;
    }
    console.log('User info for month', month, 'is: ', rows);
    res.json(rows);
  });
});


module.exports = router;

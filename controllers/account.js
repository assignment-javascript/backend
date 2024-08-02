// controllers/account.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/accountModel');

router.post('', (req, res) => {
  console.log(req.body)
  const { date, bank, category, money, content, memo, ie } = req.body;

  if (!date || !bank || !category || !money || !content || !memo || !ie) {
    return res.status(400).json({ error: '빈 값이 존재합니다.' });
  }

  userModel.insertIncome(date, bank, category, money, content, memo, ie, (error, results) => {
    if (error) {
      console.error('Error inserting data: ', error);
      return res.status(500).json({ error: 'Database error occurred.' });
    }

    res.status(201).json({ message: 'Success' });
  });
});

router.get('', (req, res) => {
  const date = req.query.date;
  const ie = req.query.ie;
  console.log(date)

  if (!date) {
    return res.status(400).send('Date query parameter is required');
  }

  userModel.getAccountByDate(date, ie, (error, rows) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Server error');
      return;
    }
    console.log('amount info for date', date, 'is: ', rows);
    res.json({ message: 'Success', data: rows });
  });
});



router.get('/report', (req, res) => {
  const date = req.query.date;

  if (!date) {
    return res.status(400).send('Month query parameter is required');
  }
  userModel.getReportByDate(date, (error, rows) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Server error');
      return;
    }
    console.log('report info for date', date, 'is: ', rows);
    res.json({ message: 'Success', data: rows });
  });
});



module.exports = router;

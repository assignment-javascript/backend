// models/userModel.js
const mysql = require('mysql2');
const dbconfig = require('../db/database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});


//  "%Y-%m
const getAccountByDate = (date, ie, callback) => {
  let query = 'SELECT id, DATE_FORMAT(date, "%Y-%m-%d %H:%i:%s") AS date, bank, category, money, content, memo, ie FROM amount WHERE DATE_FORMAT(date, "%Y-%m") = ?';
  let queryParams = [date];

  if (ie) {
    query += ' AND ie = ?';
    queryParams.push(ie);
  }

  connection.query(query, queryParams, (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, data);
  });
};



const insertIncome = (date, bank, category, money, content, memo, ie, callback) => {
  console.log(date)
  const query = `
    INSERT INTO amount (date, bank, category, money, content, memo, ie)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [date, bank, category, money, content, memo, ie];

  connection.query(query, values, (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};




const getReportByDate = (date, callback) => {
  // 쿼리문 1: 총 수입과 지출
  const totalQuery = `
    SELECT 
      SUM(CASE WHEN ie = 'I' THEN money ELSE 0 END) AS total_income,
      SUM(CASE WHEN ie = 'E' THEN money ELSE 0 END) AS total_expense,
      SUM(CASE WHEN ie = 'I' THEN money ELSE 0 END) - SUM(CASE WHEN ie = 'E' THEN money ELSE 0 END) AS total_profit
    FROM amount
    WHERE DATE_FORMAT(date, "%Y-%m") = ?
  `;

  // 쿼리문 2: 각 카테고리별 지출
  const categoryQuery = `
    SELECT 
      category,
      SUM(money) AS total_expense
    FROM amount
    WHERE ie = 'E' AND DATE_FORMAT(date, "%Y-%m") = ?
    GROUP BY category
  `;

  connection.query(totalQuery, [date], (error, totalResults) => {
    if (error) {
      callback(error, null);
      return;
    }

    connection.query(categoryQuery, [date], (error, categoryResults) => {
      if (error) {
        callback(error, null);
        return;
      }

      // 결과를 통합하여 반환
      callback(null, {
        date: date,
        total: totalResults[0],
        items: categoryResults
      });
    });
  });
};


module.exports = {
  // getAllUsers,
  getAccountByDate,
  insertIncome,
  getReportByDate
};

// models/userModel.js
const mysql = require('mysql');
const dbconfig = require('../db/database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// const getAllUsers = (callback) => {
//   const query = 'SELECT * FROM amount';
//   connection.query(query, (error, rows) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     callback(null, rows);
//   });
// };

const getUsersByMonth = (month, callback) => {
  const query = 'SELECT * FROM amount WHERE DATE_FORMAT(date_column, "%Y-%m") = ?';
  connection.query(query, [month], (error, rows) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, rows);
  });
};

module.exports = {
  // getAllUsers,
  getUsersByMonth
};

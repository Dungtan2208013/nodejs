const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ProductCollection',
  });

  connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to MySQL:', error);
    throw error;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
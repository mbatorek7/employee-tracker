const consoleTable = require('console.table'); 
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

require('dotenv').config()

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);
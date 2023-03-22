const consoleTable = require('console.table'); 
const inquirer = require('inquirer');
const mysql = require('mysql2');

//import functions to be used for each inquirer choice
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addEmployee, addRole, updateEmployeeRole } from "./queryFunctions";;

require('dotenv').config();

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

function init() {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices', 
      message: 'What would you like to do?',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'No Action']
    }
  ])
  .then((answers) => {
    switch(answers) {
      case 'View all departments':
        viewDepartments();
        break;

      case 'View all roles':
        viewRoles();
        break;

      case 'View all employees':
        viewEmployees();
        break;

      case 'Add a department':
        addDepartment();
        break;

      case 'Add a role':
        addRole();
        break;

      case 'Add am employee':
        addEmployee();
        break;
        
      case 'Update an employee role':
        updateEmployeeRole();
        break;
        
      case 'No Action':
        
    }
  })
}
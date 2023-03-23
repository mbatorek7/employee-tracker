const consoleTable = require('console.table'); 
const inquirer = require('inquirer');
const mysql = require('mysql2');

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
    switch(answers.choices) {
      case 'View all departments':
        viewDepartment();
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
        db.end();
        break;
    }
  })
}

function viewDepartment() {
  const query = `SELECT id, name AS department FROM department;`;

  db.promise().query(query)
  .then(([rows]) => {
      console.table(rows)
      init();
  })
  .catch((err) => {
    console.log(err)
  })
}


//view all roles
function viewRoles() {
  const query = `SELECT roles.id, 
                 roles.title,
                 department.name AS department,
                 roles.salary
                 FROM roles
                 JOIN department 
                 ON roles.department_id = department.id;`;
  db.promise().query(query)
  .then(([rows]) => {
      console.table(rows)
      init();
  })
  .catch((err) => {
    console.log(err)
  })
}

//view all employees
function viewEmployees() {
  const query = `SELECT employee.id, 
                 employee.first_name, 
                 employee.last_name,
                 roles.title,
                 department.name AS department,
                 roles.salary,
                 employee.manager_id 
                 FROM employee
                 LEFT JOIN roles ON employee.role_id = roles.id
                 LEFT JOIN department ON roles.department_id = department.id;`;
  
   db.promise().query(query)
  .then(([rows]) => {
      console.table(rows)
      init();
  })
  .catch((err) => {
    console.log(err)
  })
}

//add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDepartment',
      message: "What department do you want to add?"
    }
  ]) 
  .then((answer) => {
    const query = `INSERT INTO department (name) VALUES (?);`;
    db.query(query, answer.addDepartment, (err, result) => {
      if (err) throw err;
      console.log('Added ' + answer.addDepartment + " to departments!"); 

      viewDepartment();
    });
  });
}

//add a role
function addRole() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addRole',
      message: "What role do you want to add?"
    },
    {
      type: 'input', 
      name: 'addSalary',
      message: "What is the salary for this new role?"
    }
  ]) 
  .then((answer) => {
    const query = `INSERT INTO roles (title, salary) VALUES (?);`;
    
  })
}

//add an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'employeeFirst',
      message: "What is the first name of the employee?"
    },
    {
      type: 'input', 
      name: 'employeeLast',
      message: "What is the last name of the employee?"
    }
  ]) 
  .then((answer) => {
    const query = `INSERT INTO employee (first_name, last_name) VALUES (?);`;

  })
}

//update employee role
function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'employeeFirst',
      message: "What is the first name of the employee?"
    }
  ]) 
  .then((answer) => {
    const query = ``;

  })
}

init();
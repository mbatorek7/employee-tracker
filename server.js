const consoleTable = require('console.table'); 
const inquirer = require('inquirer');
const mysql = require('mysql2');
var value = [];

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
                'Update an employee',
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

      case 'Add an employee':
        addEmployee();
        break;
        
      case 'Update an employee':
        updateEmployee();
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
      console.log(`Added ${answer.addDepartment} to departments!`); 

      viewDepartment();
      init();
    });
  });
}

//add a role
function addRole() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?"
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary for this new role?"
    }, 
    {
      type: 'input', 
      name: 'dept',
      message: "What is the department for this new role?"
    }
  ]) 
  .then((answer) => {
    const getDept = `SELECT id FROM department WHERE name = (?);`;

    const query = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);`;
    const values = [answer.role, answer.salary];

    db.query(getDept, answer.dept, (err, data) => {
      if(err) {
        throw err;
      } else {
        console.log(data[0].id)
        values.push(data[0].id)
        db.query(query, values, (err, result) => {
          if (err) throw err;
          console.log(`Added ${answer.role} to roles!`); 
        });
      }
    });

    init();
  })
}

function setValue(data) {
  value = data;
  console.log(value);
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
    const values = [[answer.employeeFirst, answer.employeeLast]];

    db.query(query, values, (err, result) => {
      if (err) throw err;
      console.log(`Added ${answer.employeeFirst} ${answer.employeeLast} to employee!`); 
    });

    init();
  })
}

//update employee role
function updateEmployee() {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'employeeID',
      message: "What is the ID of the employee?"
    },
    {
      type: 'list', 
      name: 'update',
      message: "Do you want to update a manager or role?",
      choices: ['Role', 'Manager']
    },
    {
      type: 'input', 
      name: 'updateColumnID',
      message: "Please enter new id for this column:",
    },
  ]) 
  .then((answer) => {
    const queryManager = `UPDATE employee
                   SET manager_id = ?
                   WHERE id = (?);`;
    const queryRole = `UPDATE employee
                   SET role_id = ?
                   WHERE id = (?);`;
    switch(answer.update) {
      case 'Role':
        db.query(queryRole, [answer.updateColumnID ,answer.employeeID], (err, data) => {
          console.log("Updated employee role");
          init();
        })
        break;
      case 'Manager':
        db.query(queryManager, [answer.updateColumnID ,answer.employeeID], (err, data) => {
          console.log("Updated employee manager");
          init();
        })
        break;
    }     
  })
}

init();
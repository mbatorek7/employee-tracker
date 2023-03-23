//view all departments
const viewDepartment = `SELECT *
                        FROM department;`;

//view all roles
function viewRoles() {
  const query = `SELECT roles.id AS id, 
                 roles.title AS title,
                 department.name AS department,
                 roles.salary AS salary 
                 FROM roles
                 INNER JOIN department 
                 ON role.department_id = department.id;`;
}

//view all employees
function viewEmployees() {
  const query = `SELECT employee.id AS id, 
                 employee.first_name AS first_name, 
                 employee.last_name AS last_name,
                 roles.title AS title,
                 department.name AS department,
                 roles.salary AS salary,
                 employee.manager_id 
                 FROM employee
                 LEFT JOIN roles ON employee.role_id = roles.id
                 LEFT JOIN department ON roles.department_id = department.id;`;
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
    const query = `INSERT INTO department (name) VALUES (?)`;

  })
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
    const query = `INSERT INTO roles (title, salary) VALUES (?)`;

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
    const query = `INSERT INTO employee (first_name, last_name) VALUES (?)`;

  })
}

//update employee role
function updateEmployeeRole() {

}

//export all functions to be used in server.js
module.exports = {viewDepartment, viewRoles, viewEmployees, addDepartment, addEmployee, addRole, updateEmployeeRole};
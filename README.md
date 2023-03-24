# Employee Tracker

## User Story
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
## Acceptance Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Description
This database allows the users to view all departments, roles, and employees. The user also has the option to add a department, role, or employee. The user can also update an employee's role or manager. One flaw with this application is that there is a glitch when inquirer is asking the user to add a new role. The question will be asked twice, but also this data is inserted into the tables twice.

<p align="center">
    <a href="https://github.com/mbatorek7/hw12-employee-tracker"><img src="https://img.shields.io/badge/-See Live Site-success?style=for-the-badge"  alt="GitHub Repo" ></a>
</p>

## Screenshots

Here is what the final product looks like and how to use it:


## Installation
To clone this repo:

git clone git@github.com:mbatorek7/hw12-employee-tracker.git

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Questions?
  - Github Profile: [https://github.com/mbatorek7](https://github.com/mbatorek7)
  - Email: [maegan.batorek@valpo.edu](maegan.batorek@valpo.edu)
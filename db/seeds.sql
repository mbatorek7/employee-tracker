INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)    
VALUES  ("Salesman", 50000, 1),
        ("Engineer", 80000, 2),
        ("Accountant", 70000, 3),
        ("Lawyer", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)   
VALUES  ("John", "Doe", 1, NULL),
        ("Jane", "Doe", 1, 1),
        ("Marc", "Jacobs", 4, NULL),
        ("Johnny", "Cade", 2, NULL),
        ("Mike", "Dawn", 2, 4),
        ("Liam", "Cane", 3, NULL);
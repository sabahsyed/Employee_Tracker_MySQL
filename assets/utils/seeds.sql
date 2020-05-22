USE EmployeeTrackerDB;

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant Lead", 125000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000,2);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Intern", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account managerr", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Sales Lead", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 125000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Finance Manager", 125000, 3);




INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");




INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Tacker", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ahmed", "Syed", 2 ,2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kristi", "Jude", 2, 3);
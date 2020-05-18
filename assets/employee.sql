Create database EmployeeTracker;
Use Employee;


Create table department(
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

Create table role(
   id INT PRIMARY KEY,
   title VARCHAR(30),
   department_id INT
);

Create table employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
);
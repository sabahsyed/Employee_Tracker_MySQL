Create database EmployeeTrackerDB;


Use EmployeeTrackerDB;


Create table if not exists department(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(30)
);

Create table if not exists role(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   title VARCHAR(30),
   salary DECIMAL ,
   department_id INT,
   Foreign key (department_id) REFERENCES department(id)

);

Create table if not exists employee(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    Foreign key (manager_id)  REFERENCES employee(id) ON DELETE SET NULL , 
    Foreign key (role_id) REFERENCES role(id)
);

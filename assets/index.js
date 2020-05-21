var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

//Connecting to the SQL
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "EmployeeTrackerDB"
});

connection.connect(function (err) {
    //if (err) throw err;
    console.log("Connection successful at id " + connection.threadId);
    start();

});

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do ? ",
        choices: [
            "View all Employees",
            "View all Employee by Department",
            "View all Employees by Manager",
            "Add Employee",
            "Add role",
            "Add department",
            "Update Employee Role",
            "Update Employee Manager",
            "Exit"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View all Employees":
                    viewAllEmployees();
                    break;
                case "View all Employee by Department":
                    viewEmployeesByDept();
                    break;
                case "View all Employees by Manager":
                    viewEmployeesByManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add Department":
                    addDept();
                    break;

                case "Exit":
                    connection.end();
            }
        });

}

function addRole() {
    connection.query("SELECT name, id FROM department", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "role",
                message: "What role would you like to add?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?"
            },
            {
                type: "list",
                name: "departmentID",
                message: "What department does this role belong to?",
                choices: res.map(department => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                })
            }
        ]).then(createPrompt => {
            connection.query(
                "INSERT INTO role SET ?",
                [
                    {
                        title: createPrompt.role,
                        salary: createPrompt.salary,
                        department_id: createPrompt.departmentID
                    }
                ],
                function (errTwo, resTwo) {
                    if (errTwo) throw errTwo;
                    console.log("A new role has been added")
                    //call your function                 
                }
            );
        });
    })
}

function addDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "dept",
            message: "What department would you like to add?",
        },
    ]).then(createPrompt => {
        connection.query(
            "INSERT INTO department SET ?",
            [
                {
                    name: createPrompt.name
                }
            ],
            function (err, resTwo) {
                if (err) throw err;
                console.log("A new department has been added")

            }
        );
    });
}
//Function to add an employee
function addEmployee() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to add ?",
        choices: [
            "Add Employee",
            "Add Manager",
            "Exit"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                // Add Employee
                case "Add Employee":
                    connection.query("SELECT * FROM employee", function (err, resEmp) {
                        if (err) throw err;
                        console.log(resEmp);
                        addNewEmployee(resEmp);

                    });
                    break;

                //Add Manager
                case "Add Manager":
                    connection.query("SELECT * FROM employee", function (err, resEmp) {
                        if (err) throw err;
                        console.log(resEmp);
                        addNewManager(resEmp);
                    });
                    break;
                case "Exit":
                    connection.end();
            }
        });


    function addNewEmployee(resEmp) {
        inquirer.prompt([
            {
                name: "fname",
                type: "input",
                message: " What is Employee's first name ?"
            },
            {
                name: "lname",
                type: "input",
                message: " What is Employee's last name ?"
            },
            {
                name: "roleId",
                typpe: "input",
                message: "What is your roleID?"
            },
            {
                name: "empManager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: resEmp.map(employee => {
                    return {
                        name: employee.first_name + employee.last_name,
                        value: employee.id
                    }
                })
            }

        ])
            .then(function (answer) {
                console.log(answer.empManager);
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        //Left hand side of colon is the column name in table
                        first_name: answer.fname,
                        last_name: answer.lname,
                        manager_id: answer.empManager,
                        role_id: answer.roleId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("1 record inserted into Employee as Employee");
                    }
                );


            })
            .catch(error => {
                if (error)
                    console.log("Error");
            });
    }
    function addNewManager(resDept) {

        console.log(resDept);
        inquirer.prompt([
            {
                name: "fname",
                type: "input",
                message: " What is Manager's first name ?",
            },
            {
                name: "lname",
                type: "input",
                message: " What is Manager's last name ?",
            },
            {
                name: "deptName",
                type: "list",
                message: "What is the department name?",
                choices:
                    resDept.map(department => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    })
            }
        ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        //Left hand side of colon is the column name in table
                        first_name: answer.fname,
                        last_name: answer.lname,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("1 record inserted into Employee as Manager");
                        return
                    }
                );

            });
    }
}





function viewAllEmployees() {
    var query = "SELECT id , first_name as FirstName , last_name as LastName , role_id as RoleID , manager_id as ManagerID FROM employee ";
    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
    })
    connection.end();
}

function viewEmployeesByDept() {
    var query = "SELECT department.name as department, employee.first_name, employee.last_name,role.title as title  from department LEFT JOIN role on department.id = role.department_id LEFT JOIN employee on employee.role_id = role.id;";
    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
    })
    connection.end();
}


function viewEmployeesByManager() {
    var query = "SELECT employee.id , first_name as FirstName , last_name as LastName , role_id as RoleID , manager_id as ManagerID, role.title as title, department.name as department FROM employee LEFT JOIN role on employee.manager_id = employee.id LEFT JOIN department on employee.manager_id = employee.id";
    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
    })
    connection.end();
}


function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "update",
            type: "input",
            message: "Enter employee id to update the role..."
        }
    ])
        .then(function (answer) {
            console.log(answer);
        });
}
// function addDeptToManager() {
//     var query = "SELECT NAME from DEPARTMENT";
//     connection.query(query, function (err, res) {
//         if (err) throw err;
//             inquirer.prompt([
//                 {
//                     name: "deptName",
//                     type: "list",
//                     message: "Choose the department name.",
//                     choices:
//                         res.map(department => {
//                         console.log(department)
//                     })
//                  }

//             ])
//     });  
// }

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
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection successful at id " +  connection.threadId);
    start();

  });

  function start(){
      inquirer.prompt({
          name: "action",
          type : "list",
          message  : "What would you like to do ? ",
          choices :[
              "View all Employees",
              "View all Employee by Department",
              "View all Employees by Manager",
              "Add Employee",
              "Update Employee Role",
              "Update Employee Manager",
              "Exit"
          ] 
      })
      .then(function(answer){
          switch(answer.action){
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
                case "Exit":
                    connection.end();
          }
      });

  }

  //Function to add an employee
function addEmployee(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message : "What would you like to add ?",
        choices :[
            "Add Employee",
            "Add Manager",
            "Exit"
        ]
    })
    .then(function(answer){
        switch(answer.action){
            // Add Employee
            case "Add Employee":
                inquirer.prompt([
                {
                    name: "fname",
                    type : "input",
                    message  : " What is Employee's first name ?"
                },
                {
                    name: "lname",
                    type : "input",
                    message  : " What is Employee's last name ?"
                },
                {
                    name : "deptName",
                    text :"input",
                    message : "What is the department name?"
                },
                ])
                .then(function(answer){
                    connection.query(
                        "INSERT INTO employee SET ?",
                        {
                            //Left hand side of colon is the column name in table
                          first_name: answer.fname,
                          last_name: answer.lname,
                          department_name : answer.deptName
                        },
                    function (err) {  
                    if (err) throw err;  
                    console.log("1 record inserted into Employee as Employee");  
                    }
                ); 
      
      
                })
                .catch(error => {
                    if(error) {
                      console.log("Error");
                    }
                });
                break;
                // var sql = "INSERT INTO employee(first_name, last_name) VALUES ('Sabah Syed','Bangalore')";  
                // connection.query(sql, function (err, result) {  
                // if (err) throw err;  
                // console.log("1 record inserted into Employee as Employee");  
                // });  

            //Add Manager
            case "Add Manager":
                inquirer.prompt([
                {
                    name: "fname",
                    type : "input",
                    message  : " What is Manager's first name ?",
                },
                {
                    name: "lname",
                    type : "input",
                    message  : " What is Manager's last name ?",
                }
                ])
                .then(function(answer){
                    //var sql = "INSERT INTO employee(first_name, last_name) VALUES" (first_name, last_name);  
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
                    }
                ); 
      
                });
                break;
            case "Exit":
                connection.end(); 
            }
        });
    }

    function viewAllEmployees(){
        var query = "SELECT * FROM employee ";
        connection.query(query, function(err,res){
            if(err) throw err;
            for(var i = 0 ; i<res.length ; i++){
                console.table(
                    [
                        {
                            id : res[i].id,
                            FirstName : res[i].first_name,
                            LastName : res[i].last_name,
                            RoleId : res[i].role_id,
                            ManagerId : res[i].manager_id,
                            DepartmentName : res[i].department_name
                        }
                    ]
                );
            }
        })
        connection.end();
    }

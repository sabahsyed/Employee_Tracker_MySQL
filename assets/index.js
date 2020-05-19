var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');


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
    connection.end();

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
              "exit"
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
            case "Add Employee":
            var sql = "INSERT INTO employee (first_name, last_name) VALUES?",('first_name', 'last_name')
            connection.query(sql, function (err) {
                if (err) throw err;
                console.log("1 record inserted"); 
            case "Add Manager":
                var sql = "INSERT INTO employee (first_name, last_name) VALUES?",('first_name', 'last_name')
                connection.query(sql, function (err) {
                if (err) throw err;
                 console.log("1 record inserted"); 

        }
    }
});
}
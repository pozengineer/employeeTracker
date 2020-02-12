var mysql = require("mysql");
var inquirer = require('inquirer');
var table = require('table-layout');
var cTable = require('console.table');
var express = require("express");
var path = require("path");
// const fs = require("fs");
const jQuery = require('jquery');
// const util = require("util");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "!ronMan2012",
    database: "employeetracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    initiateQues();
    // connection.end();
});

function validateName(name) {
    const inputName = name;
    // const nameRegex = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/
    // /^(?=.*?[a-zA-Z])[a-zA-Z\s]*$/
    // /^([A-Z][a-z]*)[a-zA-Z\S]*$/
    // [A-Z][a-z]* [A-Z][a-z]*
    const nameRegex = /^(?=.*?[a-zA-Z])[a-zA-Z\S]*$/;
    const nameResult = nameRegex.test(inputName);
    if (nameResult) {
        return true;
    }
    else {
        console.log(' Enter at least one alphabetic character and no spaces!');
    }
}

function initiateQues() {
    const startQues = [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'currTask',
            choices: [
                'view all employees',
                'view employees by department',
                'view employees by manager',
                'add employee',
                'remove employee',
                'update employee role',
                'update employee manager',
                'view all roles',
                'add role',
                'remove role',
                'add department',
                'remove department',
                'check budget',
                'exit application'
            ]
            // validate: validateName
        }
    ]
    inquirer.prompt(startQues)
        .then((data) => {
            if (data.currTask === 'view all employees') {
                queryAllEmployees();
            }
            else if (data.currTask === 'view employees by department') {
                queryByDepartment();
            }
            else if (data.currTask === 'add employee') {
                addEmployee();
            }
            else if (data.currTask === 'remove employee') {
                deleteEmployee();
            }
            else if (data.currTask === 'view all roles') {
                queryAllRoles();
            }
            else if (data.currTask === 'update employee role') {
                updateRole();
            }
            else if (data.currTask === 'add role') {
                addRole();
            }
            else if (data.currTask === 'remove role') {
                removeRole();
            }
            else if (data.currTask === 'add department') {
                addDepartment();
            }
            else if (data.currTask === 'remove department') {
                removeDepartment();
            }
            else if (data.currTask === 'check budget') {
                queryTotalBudget();
            }
            else {
                console.log('Finished using application');
                connection.end();
            }
        });
}

function queryAllEmployees() {
    let query = 'SELECT employee.position, employee.firstName, employee.lastName, role.title, department.departName, role.salary, ';
    query += 'manager.managerName FROM employee, role, department, manager WHERE employee.roleID = role.position ';
    query += 'AND role.departmentID = department.position AND employee.managerID = manager.position ORDER BY employee.position';
    connection.query(query, function (err, res) {
        if (err) throw err;
        const resArray = [];
        // const header = {
        //     'position': 'Position',
        //     'firstName': 'First_Name',
        //     'lastName': 'Last_Name',
        //     'title': 'Role',
        //     'salary': 'Salary',
        //     'departName': 'Department'
        // }
        // resArray.push(header)
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            const row = {
                'index': i,
                'position': res[i].position,
                'firstName': res[i].firstName,
                'lastName': res[i].lastName,
                'title': res[i].title,
                'departName': res[i].departName,
                'salary': res[i].salary,
                'managerName': res[i].managerName
            };
            resArray.push(row);
        }
        // console.log(resArray);
        // table = new table(resArray, { maxWidth: 100 })
        // console.log(table.toString());
        console.table(resArray);
        console.log("-----------------------------------");
        initiateQues();
    });
}

function addEmployee() {
    console.log("Inserting a new employee...\n");
    let query01 = "SELECT role.position, role.title FROM role";
    connection.query(query01, function (err, res01) {
        if (err) throw err;
        console.log(res01);
        const roleArray = [];
        res01.forEach(element => {
            roleArray.push(element.title);
        })
        let query02 = "SELECT manager.position, manager.managerName FROM manager";
        connection.query(query02, function (err, res02) {
            if (err) throw err;
            console.log(res02);
            const managerArray = [];
            res02.forEach(element => {
                managerArray.push(element.managerName);
            })
            console.log(roleArray);
            console.log(managerArray);
            const addEmployeeQues = [
                {
                    type: 'input',
                    message: 'Enter employee first name',
                    name: 'firstName',
                    validate: validateName
                },
                {
                    type: 'input',
                    message: 'Enter employee last name',
                    name: 'lastName',
                    validate: validateName
                },
                {
                    type: 'list',
                    message: 'Select employee role',
                    name: 'roleSelect',
                    choices: roleArray
                    // validate: validateName
                },
                {
                    type: 'list',
                    message: 'Assign manager',
                    name: 'managerSelect',
                    choices: managerArray
                    // validate: validateName
                }
            ]
            inquirer.prompt(addEmployeeQues)
            .then((data) => {
                // console.log(res01);
                res01.forEach(element => {
                    if (data.roleSelect === element.title) {
                        const rolePos = element.position;
                        console.log(rolePos);
                        res02.forEach(element => {
                            if (data.managerSelect === element.managerName) {
                                const managerPos = element.position;
                                console.log(managerPos);
                                let query = "INSERT INTO employee SET ?";
                                connection.query(query,
                                {
                                    firstName: data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1),
                                    lastName: data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1),
                                    roleID: rolePos,
                                    managerID: managerPos
                                },
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + " employee added!\n");
                                    initiateQues();
                                })
                            }
                        })
                    }
                })
                // const rolePos = matchRoleSelect(res, data);
            });
        });
    });
}

function matchRoleSelect(response, data) {
    response.forEach(element => {
        if (data.roleSelect === element.title) {
            const rolePos = element.position;
            console.log(rolePos);
            return rolePos;
        }
    })
}

function deleteEmployee() {
    console.log("Deleting an existing employee...\n");
    let query = "SELECT employee.position, employee.firstName, employee.lastName FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const employeeArray = [];
        console.log(res);
        res.forEach((element, i) => {
            const nameStr = `${element.firstName} ${element.lastName}`
            employeeArray.push(nameStr);
        })
        console.log(employeeArray);
        const deleteEmployeeQues = [
            {
                type: 'list',
                message: 'Select employee to remove',
                name: 'nameSelect',
                choices: employeeArray
                // validate: validateName
            }
        ]
        inquirer.prompt(deleteEmployeeQues)
        .then((data) => {
            console.log(res);
            const str = data.nameSelect;
            const answerSplit = str.split(" ");
            console.log(answerSplit[0]);
            res.forEach(element => {
                if(element.firstName === answerSplit[0] && element.lastName === answerSplit[1]) {
                    const employPos = element.position;
                    let query = "DELETE FROM employee WHERE employee.position = ?";
                    connection.query(query,
                    [
                        employPos
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee deleted!\n");
                        initiateQues();
                    })
                }
            })
            // const rolePos = matchRoleSelect(res, data);
        });
    });
}

function queryByDepartment() {
    let query = "SELECT department.departName FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const departArray = [];
        res.forEach(element => {
            departArray.push(element.departName)
        })
        console.log(departArray);
        const addViewQues = [
            {
                type: 'list',
                message: 'Select department to view',
                name: 'departSelect',
                choices: departArray
                // validate: validateName
            }
        ]
        inquirer.prompt(addViewQues)
        .then((data) => {
            let query = 'SELECT employee.position, employee.firstName, employee.lastName, role.title, role.salary, department.departName ';
            query += 'FROM employee, role, department WHERE employee.roleID = role.position AND role.departmentID = department.position ';
            query += 'AND department.departName = ? ORDER BY employee.position;';
            connection.query(query,
            [
                data.departSelect
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res);
                const resArray = [];
                let totalBudget = 0;
                res.forEach((element, i) => {
                    totalBudget += element.salary;
                    const row = {
                        'index': i,
                        'position': element.position,
                        'firstName': element.firstName,
                        'lastName': element.lastName,
                        'title': element.title,
                        'salary': element.salary,
                        'departName': element.departName
                    }
                    resArray.push(row);
                })
                console.table(resArray);
                console.log(`Total utilized budget of ${data.departSelect}: $${totalBudget}`)
                console.log("-----------------------------------");
                initiateQues();
            })
        });
    });
}

function updateRole() {
    console.log("Updating an existing role...\n");
    let query = "SELECT role.title, role.salary FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const roleArray = [];
        res.forEach(element => {
            roleArray.push(element.title)
        })
        console.log(roleArray);
        const updateRoleQues = [
            {
                type: 'list',
                message: 'Select role to update',
                name: 'roleSelect',
                choices: roleArray
                // validate: validateName
            },
            {
                type: 'input',
                message: 'Enter new salary',
                name: 'newSalary',
                // validate: validateName
            }
        ]
        inquirer.prompt(updateRoleQues)
        .then((data) => {
            let query = "UPDATE role SET ? WHERE ?";
            connection.query(query,
            [
                {
                    salary: data.newSalary
                },
                {
                    title: data.roleSelect
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role updated!\n");
                initiateQues();
            })
            // const rolePos = matchRoleSelect(res, data);
        });
    });
}

function addRole() {
    console.log("Adding a new role...\n");
    let query = "SELECT department.position, department.departName FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const departArray = [];
        res.forEach(element => {
            departArray.push(element.departName)
        })
        console.log(departArray);
        const addRoleQues = [
            {
                type: 'input',
                message: 'Enter role title',
                name: 'roleTitle',
                // validate: validateName
            },
            {
                type: 'input',
                message: 'Enter role salary',
                name: 'roleSalary',
                // validate: validateName
            },
            {
                type: 'list',
                message: 'Select department',
                name: 'departSelect',
                choices: departArray
                // validate: validateName
            }
        ]
        inquirer.prompt(addRoleQues)
        .then((data) => {
            console.log(res);
            res.forEach(element => {
                if (data.departSelect === element.departName) {
                    const departPos = element.position;
                    console.log(departPos);
                    let query = "INSERT INTO role SET ?";
                    connection.query(query,
                    {
                        title: data.roleTitle,
                        salary: data.roleSalary,
                        departmentID: departPos
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " role added!\n");
                        initiateQues();
                    })
                }
            })
            // const rolePos = matchRoleSelect(res, data);
        });
    });
}

function removeRole() {
    console.log("Deleting an existing role...\n");
    let query = "SELECT role.title FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const roleArray = [];
        // console.log(res);
        res.forEach((element) => {
            roleArray.push(element.title);
        })
        // console.log(roleArray);
        const deleteRoleQues = [
            {
                type: 'list',
                message: 'Select role to remove',
                name: 'roleSelect',
                choices: roleArray
                // validate: validateName
            }
        ]
        inquirer.prompt(deleteRoleQues)
        .then((data) => {
            // console.log(res);
            let query = "DELETE FROM role WHERE role.title = ?";
            connection.query(query,
                [
                    data.roleSelect
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " role deleted!\n");
                    initiateQues();
                })
            // const rolePos = matchRoleSelect(res, data);
        });
    });
}

function queryAllRoles() {
    let query = 'SELECT role.position, role.title, role.salary, department.departName ';
    query += 'FROM role, department WHERE role.departmentID = department.position ';
    query += 'ORDER BY role.position;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        const resArray = [];
        for (var i = 0; i < res.length; i++) {
            const row = {
                'index': i,
                'position': res[i].position,
                'title': res[i].title,
                'salary': res[i].salary,
                'departName': res[i].departName
            };
            resArray.push(row);
        }
        console.table(resArray);
        console.log("-----------------------------------");
        initiateQues();
    });
}

function addDepartment() {
    console.log("Adding a new department...\n");
    const addDepartQues = [
        {
            type: 'input',
            message: 'Enter new department',
            name: 'departName',
            // validate: validateName
        }
    ]
    inquirer.prompt(addDepartQues)
    .then((data) => {
        let query = "INSERT INTO department SET ?";
        connection.query(query,
        {
            departName: data.departName
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department added!\n");
            initiateQues();
        })
    });
}

function removeDepartment() {
    console.log("Deleting an existing department...\n");
    let query = "SELECT department.departName FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const departArray = [];
        // console.log(res);
        res.forEach((element) => {
            departArray.push(element.departName);
        })
        // console.log(roleArray);
        const deleteDepartQues = [
            {
                type: 'list',
                message: 'Select department to remove',
                name: 'departSelect',
                choices: departArray
                // validate: validateName
            }
        ]
        inquirer.prompt(deleteDepartQues)
        .then((data) => {
            // console.log(res);
            let query = "DELETE FROM department WHERE department.departName = ?";
            connection.query(query,
                [
                    data.departSelect
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " department deleted!\n");
                    initiateQues();
                })
            // const rolePos = matchRoleSelect(res, data);
        });
    });
}

function queryTotalBudget() {
    let query = 'SELECT role.salary FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res);
        let totalBudget = 0;
        res.forEach(element => {
            totalBudget += element.salary;
        })
        console.log(`Total utilized budget: $${totalBudget}`);
        console.log("-----------------------------------");
        initiateQues();
    });
}

function queryEmployees() {
    let query = "SELECT employee.position, employee.firstName, employee.secondName, employee.roleID FROM employee"
    connection.query(query, function (err, res) {
        if (err) throw err;
        const resArray = [];
        const header = {
            'position': 'Position',
            'firstName': 'First_Name',
            'secondName': 'Last_Name',
            'roleID': 'Role'
        }
        resArray.push(header)
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            const row = {
                'position': res[i].position,
                'firstName': res[i].firstName,
                'secondName': res[i].secondName,
                'roleID': res[i].roleID
            };
            resArray.push(row);
        }
        console.log(resArray);
        table = new table(resArray, { maxWidth: 50 })
        console.log(table.toString())
        // console.log(resArray);
        console.log("-----------------------------------");
    });
}
// connection.end();
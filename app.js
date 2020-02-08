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

function initiateQues() {
    const startQues = [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'currTask',
            choices: [
                'view all employees',
                'view all employees by department',
                'view all employees by manager',
                'add employee',
                'remove employee',
                'update employee role',
                'update employee manager',
                'view all roles',
                'add role',
                'remove role',
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
        else if (data.currTask === 'exit application') {
            console.log('Finished using application');
            connection.end();
        }
        else {
            console.log('Finished using application');
            connection.end();
        }
    });
}

function queryAllEmployees() {
    let query = 'SELECT employee.position, employee.firstName, employee.lastName, role.title, role.salary, department.departName ';
    query += 'FROM employee, role, department WHERE  employee.roleID = role.position AND role.departmentID = department.position ';
    query += 'order by employee.position;';
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
                'position': res[i].position,
                'firstName': res[i].firstName,
                'lastName': res[i].lastName,
                'title': res[i].title,
                'salary': res[i].salary,
                'departName': res[i].salary
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

function queryEmployees() {
    let query = "select employee.position, employee.firstName, employee.secondName, employee.roleID from employee"
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

function querySongArtist() {
    var query = connection.query("SELECT * FROM songList", function (err, res) {
        if (err) throw err;
        inquirer.prompt(songQues)
            .then((data) => {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].artist === data.artist) {
                        // console.log('artist Selected');
                        console.log(res[i].position + " | " + res[i].artist + " | " + res[i].songName + " | " + res[i].year);
                    }
                }
            })
    });
    console.log(query.sql);
}

function queryArtistMoreThanOnce() {
    var query = connection.query("SELECT`artist`, COUNT(*) AS artistCount FROM`songList` GROUP BY`artist`", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            if (res[i].artistCount > 1) {
                // console.log('artist Selected');
                console.log(res[i].artistCount + " | " + res[i].artist);
            }
        }
    });
    console.log(query.sql);
}

function createSong() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO songs SET ?",
        {
            title: "Bad Guy",
            artist: 'Billie Ellish',
            genre: 'Pop'
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            // updateProduct();
        }
    );
}

function updateSong() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
        "UPDATE songs SET ? WHERE ?",
        [
            {
                genre: "Rock"
            },
            {
                artist: "Billie Ellish"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            // deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function deleteSong() {
    console.log("Deleting all strawberry icecream...\n");
    connection.query(
        "DELETE FROM products WHERE ?",
        {
            artist: "Billie Ellish"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " artist deleted!\n");
            // Call readProducts AFTER the DELETE completes
            // readProducts();
        }
    );
}

function readProducts() {
    console.log("Selecting all songs...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        // connection.end();
    });
}

// connection.end();
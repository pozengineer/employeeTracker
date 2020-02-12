ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;
USE employeeTracker_DB;

CREATE TABLE manager (
    position INT NOT NULL AUTO_INCREMENT,
    managerName VARCHAR(30) NULL,
    PRIMARY KEY (position)
);

CREATE TABLE department (
    position INT NOT NULL AUTO_INCREMENT,
    departName VARCHAR(30) NOT NULL,
    PRIMARY KEY (position)
);

CREATE TABLE role (
    position INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    departmentID INT(10) NOT NULL,
    salary INT(6) NOT NULL,
    PRIMARY KEY (position),
    CONSTRAINT FK_department FOREIGN KEY (departmentID)
    REFERENCES department(position) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE employee (
    position INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName  VARCHAR(30) NOT NULL,
    roleID INT(10) NOT NULL,
    managerID INT(10) NULL,
    PRIMARY KEY (position),
    CONSTRAINT FK_role FOREIGN KEY (roleID)
    REFERENCES role(position) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_manager FOREIGN KEY (managerID) 
    REFERENCES manager(position) ON UPDATE CASCADE ON DELETE CASCADE
);
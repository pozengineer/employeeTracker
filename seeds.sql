INSERT INTO department (departName)
VALUES ('Sales');

INSERT INTO department (departName)
VALUES ('Engineering');

INSERT INTO department (departName)
VALUES ('Legal');

INSERT INTO department (departName)
VALUES ('Finance');

INSERT INTO role (title, salary, departmentID)
VALUES ('Sales Lead', 100000, 1);

INSERT INTO role (title, salary, departmentID)
VALUES ('Salesperson', 80000, 1);

INSERT INTO role (title, salary, departmentID)
VALUES ('Lead Engineer', 150000, 2);

INSERT INTO role (title, salary, departmentID)
VALUES ('Software Engineer', 120000, 2);

INSERT INTO role (title, salary, departmentID)
VALUES ('Accountant', 125000, 4);

INSERT INTO role (title, salary, departmentID)
VALUES ('Legal Team Lead', 250000, 3);

INSERT INTO role (title, salary, departmentID)
VALUES ('Lawyer', 190000, 3);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Jon', 'Doe', 1);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Mike', 'Chan', 2);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Ashley', 'Rodriquez', 3);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Kevin', 'Tupik', 4);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Malia', 'Brown', 5);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Sarah', 'Lourd', 6);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Tom', 'Allen', 7);

INSERT INTO employee (firstName, lastName, roleID)
VALUES ('Tammer', 'Galal', 4);

SELECT employee.position, employee.firstName,
employee.secondName, role.title, role.salary,
department.name
FROM employee, role, department
WHERE  employee.roleID = role.position
AND role.departmentID = department.position
order by employee.position;
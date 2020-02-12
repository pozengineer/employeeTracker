INSERT INTO manager (managerName)
VALUES ('');

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

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Jon', 'Doe', 1, 1);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Mike', 'Chan', 2, 1);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Ashley', 'Rodriquez', 3, 1);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Kevin', 'Tupik', 4, 1);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Malia', 'Brown', 5, 1);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Sarah', 'Lourd', 6, 1);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Tom', 'Allen', 7, 1);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Tammer', 'Galal', 4, 1);

SELECT employee.position, employee.firstName,
employee.lastName, role.title, department.departName,
role.salary, manager.managerName
FROM employee, role, department, manager
WHERE  employee.roleID = role.position
AND role.departmentID = department.position
AND employee.managerID = manager.position
ORDER BY employee.position;
drop database if exists employeeTracker_DB;
create database employeeTracker_DB;
use employeeTracker_DB;

create table department (
    position int not null auto_increment,
    departName varChar(30) not null,
    primary key (position)
);

create table role (
    position int not null auto_increment,
    title varChar(30) not null,
    salary int(6) not null,
    departmentID int(10) not null,
    primary key (position),
    constraint FK_department foreign key (departmentID)
    references department(position) on update cascade on delete cascade
);

create table employee (
    position int not null auto_increment,
    firstName varchar(30) not null,
    lastName  varchar(30) not null,
    roleID int(10) not null,
    managerID int(10) null,
    primary key (position),
    constraint FK_role foreign key (roleID)
    references role(position) on update cascade on delete cascade,
    constraint FK_manager foreign key (managerID) 
    references manager(position) on update cascade on delete cascade
);
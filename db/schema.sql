drop database if exists employee_tracker;
create database employee_tracker;
use employee_tracker;

create table employee (
    id int not null AUTO_INCREMENT primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int
);

create table roles (
    id int not null AUTO_INCREMENT primary key,
    title varchar(30) not null,
    salary decimal(10) not null,
    department_id int not null,
    foreign key (id) references employee(role_id)
);

create table department (
    id int not null AUTO_INCREMENT primary key,
    name varchar(30) not null,
    foreign key (id) references roles(department_id)
);
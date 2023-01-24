const inquirer = require('inquirer');
const { findOneDepartment } = require('./db');
const db = require('./db')
require('console.table');

mainPrompt();

function mainPrompt() {
    const promptInfo = {
        questionList: ['Quit', 'View Employees', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Department', 'View Roles', 'Add Role'],
    }
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: promptInfo.questionList,
            name: 'option',

        }).then(res => {
            let option = res.option;
            console.log('option =', option)
            switch (option) {
                case 'View Employees':
                    viewEmployeesMain();
                    break;
                case 'Add Employee':
                    addEmployeesMain();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRoleMain();
                    break;
                case 'View Departments':
                    viewDepartmentsMain();
                    break;
                case 'Add Department':
                    addDepartmentMain();
                    break;
                case 'View Roles':
                    viewRolesMain();
                    break;
                case 'Add Role':
                    addRoleMain();
                    break;
                default:
                    quitProgram();
            }
        })
}

function quitProgram() {
    console.log('Exiting the program')
    return;
}

function viewEmployeesMain() {
    db.findAllEmployees()
    .then(([data]) => {
        console.log('\n');
        console.table(data);
    }).then(() => mainPrompt());
}
function addEmployeesMain() {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'What is the role of the employee?',
            choices: ['Accountant', 'Salesperson', 'Human Resources'],
            name: 'roleId'
        }, 
        {
            type: 'list',
            message: 'Who is the manager of the employee?',
            choices: ['John Doe', 'Jill Smith', 'Madison Dolan'],
            name: 'managerId'
        },
    ).then(data => {
        const roleId = db.findOneRole(data.roleId)
        const managerArray = [data.firstName, data.lastName];
        const managerId = db.findOneManager(managerArray)
        db.createNewEmployee(data.firstName, data.lastName, roleId, managerId)
        
    }).then(data => {
        console.log('\n');
        console.table(data)
    }).then(() => mainPrompt())

}

function updateEmployeeRoleMain() {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'What is the new role of the employee?',
            choices: ['Accountant', 'Salesperson', 'Human Resources'],
            name: 'roleId'
        },     
    ).then(data => {
        const roleId = db.findOneRole(data.roleId)
        const employeeId = db.findOneEmployee(data.firstName, data.lastName)
        db.updateEmployeeRole(employeeId, roleId)
    }).then(data => {
        console.log('\n')
        console.table(data)
    }).then(() => mainPrompt())
}

function viewDepartmentsMain() {
    db.findAllDepartments()
    .then(([data]) => {
        // let employee = data;
        console.log('\n');
        console.table(data);
    }).then(() => mainPrompt());

}
function viewRolesMain() {
    db.findAllRoles()
    .then(([data]) => {
        // let employee = data;
        console.log('\n');
        console.table(data);
    }).then(() => mainPrompt());

}

function addRoleMain() {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What is the department of the new role?',
            name: 'department'
        }
    ).then(data => {
        const departmentId = findOneDepartment(data.department)
        db.addRole(data.title, data.salary, departmentId)
    }).then(data => {
        console.log('\n')
        console.table(data)
    }).then(() => mainPrompt())

}

function addDepartmentMain() {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'name'
        },
    ).then(data => {
        db.addDepartment(data.name)
    }).then(data => {
        console.log('\n')
        console.table(data)
    }).then(() => mainPrompt())
}
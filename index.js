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
            // switch (option) {
            //     case 'View Employees':
            //         viewEmployeesMain();
            //         break;
            //     case 'Add Employee':
            //         addEmployeesMain();
            //         break;
            //     case 'Update Employee Role':
            //         updateEmployeeRoleMain();
            //         break;
            //     case 'View Departments':
            //         viewDepartmentsMain();
            //         break;
            //     case 'Add Department':
            //         addDepartmentMain();
            //         break;
            //     case 'View Roles':
            //         viewRolesMain();
            //         break;
            //     case 'Add Role':
            //         addRoleMain();
            //         break;
            //     default:
            //         quitProgram();
            // }
            if (option === 'View Employees') {
                viewEmployeesMain()
            } else if (option === 'Add Employee') {
                addEmployeesMain() 
            } else if (option === 'Update Employee Role') {
                updateEmployeeRoleMain()
            } else if (option === 'View Departments') {
                viewDepartmentsMain() 
            } else if (option === 'Add Department') {
                addDepartmentMain() 
            } else if (option === 'View Roles') {
                viewRolesMain()
            } else if (option === 'Add Role') {
                addRoleMain()
            } 
        })
}

// function quitProgram() {
//     console.log('Exiting the program')
//     return;
// }

function viewEmployeesMain() {
    db.findAllEmployees()
    .then(([data]) => {
        console.log('\n');
        console.table(data);
        mainPrompt()
    })
}
function addEmployeesMain() {
    return inquirer.prompt([
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
    ]).then(data => {
        const roleId = db.findOneRole(data.roleId)
        return db.createNewEmployee(data.firstName, data.lastName, roleId)
        
    }).then((data) => {
        mainPrompt()
    })

}

function updateEmployeeRoleMain() {
    return inquirer.prompt([
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
    ]).then(data => {
        const roleId = db.findOneRole(data.roleId)
        const employeeId = db.findOneEmployee(data.firstName, data.lastName)
        return db.updateEmployeeRole(employeeId, roleId)
    }).then(data => {
        mainPrompt()
    })
}

function viewDepartmentsMain() {
    db.findAllDepartments()
    .then(([data]) => {
        // let employee = data;
        console.log('\n');
        console.table(data);
        mainPrompt()
    })

}
function viewRolesMain() {
    db.findAllRoles()
    .then(([data]) => {
        // let employee = data;
        console.log('\n');
        console.table(data);
        mainPrompt()
    })

}

function addRoleMain() {
    return inquirer.prompt([
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
            name: 'department',
            choices: ['Accounting', 'Sales', 'Human Resources']
        }
    ]).then(data => {
        const departmentId = findOneDepartment(data.department)
        return db.addRole(data.title, data.salary, departmentId)
    }).then(data => {
        console.log('\n')
        console.table(data)
        mainPrompt()
    })

}

function addDepartmentMain() {
   return inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'name'
        },
    ).then(data => {
        return db.addDepartment(data.name)
    }).then(data => {
        console.log('\n')
        console.table(data)
        mainPrompt()
    })
}
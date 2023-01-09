const inquirer = require('inquirer');
const db = require('./db')
const cTable = require('console.table');

mainPrompt();

function mainPrompt() {
    const promptInfo = {
        questionList: ['Quit', 'View Employees', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Department', 'View Roles', 'Add Role'],
        functionList: [quitProgram(), viewEmployeesMain(), addEmployeesMain(), updateEmployeeRoleMain(), viewDepartmentsMain(), addDepartmentMain(), viewRolesMain(), addRoleMain()],
    }
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: promptInfo.questionList,
            name: 'option',

        }).then(res => {
            for (i = 0; i in promptInfo.questionList.length; i++) {
                if (res.option === promptInfo.questionList[i]) {
                    promptInfo.functionList[i]
                }
            }
        })
}

function quitProgram() {
    console.log('Exiting the program')
}

function viewEmployeesMain() {
    db.viewEmployees() 
}

const inquirer = require('inquirer');
const db = require('./db')
// const EmployeeDatabase = require('./db/index')
const consoleTable = require('console.table');

// mainPrompt();

function mainPrompt() {
    const promptInfo = {
        questionList: ['Quit', 'View Employees', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Department', 'View Roles', 'Add Role'],
        functionList: [EmployeeDatabase.quitProgram(), EmployeeDatabase.viewEmployees(), EmployeeDatabase.addEmployees(), EmployeeDatabase.updateEmployeeRole(), EmployeeDatabase.viewDepartments(), EmployeeDatabase.addDepartment(), EmployeeDatabase.viewRoles(), EmployeeDatabase.addRole()],
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

console.log(db)

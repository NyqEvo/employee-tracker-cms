const connection = require('./connection')

class EmployeeDatabase {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        this.connection.query(`SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', department.name AS 'department', roles.title AS 'title', roles.salary AS 'salary'  
        FROM department
        JOIN roles ON department.id = roles.department_id 
        JOIN employee ON employee.role_id = roles.id;`, (err, res) => {
            if (err) {
                console.log(err)
                return;
            }
            return res
        })
    }

    createNewEmployee(newEmployee) {
        this.connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, null)`, [newEmployee.firstName, newEmployee.lastName, newEmployee.roleId], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    updateEmployeeRole(employeeId, roleId) {
        this.connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err,res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    findAllRoles() {
        this.connection.query(`select department.name as 'department', roles.title as 'title' from department join roles on department.id = roles.department_id;`, (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    addRole(newRole) {
        this.connection.query(`insert into roles (title, salary, department_id) values (?, ?, ?)`, [newRole.title, newRole.salary, newRole.departmentId], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    findAllDepartments() {
        this.connection.query(`select department.name from department`, (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    addDepartment(newDepartment) {
        this.connection.query(`insert into department (name) values (?)`, [newDepartment.name], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }
}


const test = new EmployeeDatabase(connection);

const testEmployee = {
    firstName: 'Joe',
    lastName: 'Flacco',
    roleId: 2,
}
test.createNewEmployee(testEmployee);

module.exports = new EmployeeDatabase(connection)
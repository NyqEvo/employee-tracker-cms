const connection = require('./connection')

class EmployeeDatabase {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(`SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', department.name AS 'department', roles.title AS 'title', roles.salary AS 'salary'  
        FROM department
        JOIN roles ON department.id = roles.department_id 
        JOIN employee ON employee.role_id = roles.id;`)
    }

    findOneEmployee(firstName, lastName) {
        this.connection.promise().query(`SELECT employee.id FROM employee where employee.first_name = ? AND employee.last_name = ?`, [firstName, lastName], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    createNewEmployee(firstName, lastName, roleId, managerId) {
        this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`, [firstName, lastName, roleId, managerId], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    updateEmployeeRole(employeeId, roleId) {
        this.connection.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err,res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    findOneRole(req) {
        this.connection.promise().query(`SELECT roles.id FROM roles WHERE roles.title = ?;`, [req], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    findOneManager(req) {
        this.connection.promise().query(`SELECT employee.id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, [req[0], req[1]], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    findAllRoles() {
        this.connection.promise().query(`select department.name as 'department', roles.title as 'title' from department join roles on department.id = roles.department_id;`, (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    addRole(title, salary, departmentId) {
        this.connection.promise().query(`insert into roles (title, salary, department_id) values (?, ?, ?)`, [title, salary, departmentId], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    findAllDepartments() {
        this.connection.promise().query(`select department.name from department`, (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    addDepartment(newDepartment) {
        this.connection.promise().query(`insert into department (name) values (?)`, [newDepartment], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }

    findOneDepartment(name) {
        this.connection.promise().query(`select department.id from department where department.name = ?`, [name], (err, res) => {
            if (err) {
                console.log(err)
            }
            return res
        })
    }
}


module.exports = new EmployeeDatabase(connection)
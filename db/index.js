const connection = require('./connection')

class EmployeeDatabase {
    constructor(connection) {
        this.connection = connection
    }

    
}

module.exports = new EmployeeDatabase(connection)
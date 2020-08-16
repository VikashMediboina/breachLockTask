var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    connection.query("CREATE DATABASE breachlookdata", function (err, result) {
        if (err) {
            if (err.code == "ER_DB_CREATE_EXISTS") {
                console.log("Database eists");
            }
            else {
                throw err
            }
        }
    });
});
connection.end()
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'breachlookdata',
    debug: false
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});
module.exports = connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'dbuser',
    password:'123',
    database:'my_db',
    port:'3333'
});
connection.connect();

connection.query('SELECT 1 + 1 AS solution',(err,rows,fields)=>{
    if(err)throw err;
    console.log('The solution is',rows[0].solution);
})
connection.end()
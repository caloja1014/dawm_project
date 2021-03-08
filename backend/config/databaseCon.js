var mysql = require("mysql");

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "meraki"
});

con.connect(function(err){
    if(err) throw err;
    else
        console.log("Connection Successful to meraki RDB");
});

module.exports = con;
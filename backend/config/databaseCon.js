var mysql = require("mysql");

var con = mysql.createConnection({
    host: "104.154.47.206",
    user: "root",
    password: "dawm",
    database: "meraki"
});
/*
con.connect(function(err){
    if(err) throw err;
    else
        console.log("Connection Successful to meraki RDB");
});

module.exports = con;*/
const sql = require("../config/databaseCon");

exports.findByUser = (username, result) => {
    var q = "select * from Administrador where username = '" + username + "';";
    sql.query(q, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};

exports.findById = (id, result) => {
    var q = "select username from Administrador where id ='" + id + "';";
    sql.query(q, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res[0]);
        }
    });
};

const sql = require("../config/databaseCon");

exports.insertCliente = (email, pass, result) => {
    var user = (email).split("@")[0];
    console.log(user)
    searchUserName(user,(err,res)=>{
        if(err){
            result(err,null)
            return;
        }else if(res.length){
            console.log(res)
            var number = parseInt(res[0].username.split(user)[1])+1
            user = user + number.toString()
        }
            const cliente = [email, pass,user];
            var q = "insert into Cliente(email,password,username) values (?);";
            sql.query(q, [cliente], (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                } else {
                    result(null, res);
                }
            });
        
    })
};

searchUserName = (user,result) =>{
    var q = `select username from Cliente where username like '%${user}%' order by username desc limit 1;`
   
    sql.query(q,(err,res)=>{
        if(err){
            
            result(err,null)
            return;
        }else{
            result(null,res);
            return;
        }
    })
}

exports.findByEmail = (email, result) => {
    var q = "select * from Cliente where email = '" + email + "';";
    sql.query(q, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};

exports.update = (id, body, result) => {
    let query = "";
    let params = [];
    if (body.newpass == "") {
        query =
            "UPDATE Cliente SET username = ?, nombres = ?, apellidos = ?, celular = ? WHERE id = ?";
        params = [body.username, body.name, body.lastname, body.cell, id];
    } else {
        query =
            "UPDATE Cliente SET username = ?, password = ?, nombres = ?, apellidos = ?, celular = ? WHERE id = ?";
        params = [
            body.username,
            body.newpass,
            body.name,
            body.lastname,
            body.cell,
            id,
        ];
    }
    searchUserName(body.username,(err,res)=>{
        if(err){
            result(err,null)
            return;
        }else if(res.length){
           result({kind:"username_exists"},null)
           return;
        }else{
            sql.query(query, params, (err, data) => {
                if (err) {
                    result(null, err);
                    return;
                }
                else if (data.affectedRows == 0) {
                    // not found Customer with the id
                    result({ kind: "not_found" }, null);
                    return;
                }else
                result(null, data);
            });
        }
    })
    
};

exports.getById = (id, result) => {
    sql.query("select * from Cliente where id = " + id + ";", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

const sql = require("../config/databaseCon");

exports.insertCliente = (email,pass,result) =>{
  const cliente = [email, pass]
  var q = "insert into Cliente(email,password) values (?);"
  sql.query(q, [cliente], (err,res)=>{
      if(err){
        result(err,null);
        return;
      }else{
        result(null,res);
      }
  });
}

exports.findByEmail = (email,result) =>{
  var q = "select * from Cliente where email = '"+email+"';"
  sql.query(q,(err,res)=>{
    if(err){
      result(err,null);
      return;
    }else{
      result(null,res);
    }
  });
}

exports.update = (id, body, result)=>{
  sql.query(
    "UPDATE Cliente SET username = ?, email =?, password = ?, nombres = ?, apellidos = ?, celular = ? WHERE id = ?",
    [body.username, body.email, body.newpass, body.name, body.lastname, body.cell, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    
    });
}

exports.getById = (id, result)=>{
  sql.query("select * from Cliente where id = "+ id+";",(err,res)=>{
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
}

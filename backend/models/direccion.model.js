const sql = require("../config/databaseCon");

exports.insertDireccion = (idCliente,direccion,result)=>{
    sql.query("insert into Direccion(idCliente,descripcion) values (?);",[dir],(err,res)=>{
        if(err){
            result(err,null);
            return;
          }else{
            result(null,res);
          }
    })
}

exports.getById = (idCliente,result) =>{
    sql.query("select * from Direccion where idCliente = "+ idCliente+";",(err,res)=>{
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found customer: ", res);
          result(null, res);
          return;
        }
    
        // not found Customer with the id
        result({ kind: "not_found" }, null);
      });  
    
}

exports.updateDireccion = (body, result)=>{
  sql.query(
    "UPDATE Direccion SET descripcion = ? WHERE id = ?",
    [body.direccion, body.id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Direccion with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    
    });

}

exports.deleteDireccion = (id, result) => {
  sql.query("DELETE FROM Direccion WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
}
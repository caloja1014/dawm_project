const sql = require("../config/databaseCon");

exports.insertDireccion = (idCliente,direccion,result)=>{
    sql.query(`insert into Direccion(idCliente,descripcion) values (${idCliente},${direccion});`,(err,res)=>{
        if(err){
            console.log("F")
            result(err,null);
            return;
          }else{
            console.log("YEY")
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
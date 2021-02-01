const sql = require("../config/databaseCon");

exports.findCategoria = (nombre,result) =>{
    var q = `select id from Categoria where nombre = "${nombre}";`
    sql.query(q, (err,res)=>{
        if(err){
            result(err,null);
            return;
            }else{
            result(null,res);
        }
    });
}

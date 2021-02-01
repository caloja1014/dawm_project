const sql = require("../config/databaseCon");

exports.findByUser = (username,result) =>{
    var q = "select * from Administrador where username = '"+username+"';"
    sql.query(q,(err,res)=>{
      if(err){
        result(err,null);
        return;
      }else{
        console.log(res);
        result(null,res);
      }
    });
  }

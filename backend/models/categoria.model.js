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

exports.crearCategoria=(categoria,result)=>{
    let cat=[
        categoria.imagenes,
        categoria.nombre,
        categoria.admin
    ]
    var q="insert into Categoria(imagenes,nombre,admin) values (?);";
    sql.query(q, [cat], (err,res)=>{
        if(err){
            result(err,null);
            return;
            }else{
            result(null,res);
        }
    });
}
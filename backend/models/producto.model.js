const sql = require("../config/databaseCon");
const categoriaModel=require("./categoria.model")
exports.insertProducto = (producto,result) =>{
    categoriaModel.findCategoria(producto.categoria,(er,re)=>{
        if (re.length==0){
            result(new Error("No existe la categoria que ha ingresado"),null);
                return;
        }
        let id =re[0].id
        const productoInfo = [
            producto.nombre,
            producto.descripcion,
            producto.costoBase,
            producto.imagen,
            producto.estaDisponible,
            id,
            producto.idAdmin
    
        ]
        var q = "insert into Producto(nombre,descripcion,costoBase,imagen,estaDisponible,idCategoria,idAdmin) values (?);"
        sql.query(q, [productoInfo], (err,res)=>{
            if(err){
                result(err,null);
                return;
                }else{
                result(null,res);
            }
        });
    })
    //

}
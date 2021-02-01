const producto=require("../../models/producto.model")

exports.agregarProducto=(req,res)=>{
    console.log(req.body);
    producto.insertProducto(req.body,(err,result)=>{
        if(err){
            res.status(500).send({
                message: err.toString()||"Ocurrió un error al ingresar un nuevo producto"
            })
        }else{
            console.log(result);
            res.status(200).send({message: "Producto ingreso con exito"})
        }
    });
}
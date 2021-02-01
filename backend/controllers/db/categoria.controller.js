let categoriaModel=require("../../models/categoria.model")

exports.getCategorias = (req,res)=>{
    categoriaModel.getAll((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        var categorias = []
        for (dic of data){
            categorias.push(dic.nombre);
        }
        res.send(categorias)
    })
}


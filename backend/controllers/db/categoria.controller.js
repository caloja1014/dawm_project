let categoriaModel = require("../../models/categoria.model");
const multer = require("multer");

exports.getCategorias = (req, res) => {
    categoriaModel.getAll((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        var categorias = [];
        for (dic of data) {
            categorias.push(dic.nombre);
        }
        res.send(categorias);
    });
};

exports.crearCategoria=(req,res)=>{
    let categoria={
        admin:req.adminId,
        imagenes:req.body.imagenes,
        nombre:req.body.nombre,
        descripcion:req.body.descripcion 
    }
categoriaModel.crearCategoria(categoria,(err,result)=>{
    if(err){
        res.status(500).send({
            message: err.toString()||"Ocurrió un error al ingresar una nueva categoria"
        })
    }else{
        console.log(result);
        res.status(200).send({message: "Categoría ingresada con exito"})
    }
})
}

const storageCateg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/img/categorias");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});

exports.uploadPhotoCateg = multer({ storage: storageCateg });

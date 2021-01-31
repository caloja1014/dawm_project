const Noticias =require("../../collections/noticias.model");
var multer  = require('multer')

exports.findAll=(req,res)=>{
    Noticias.find({},(err,docs)=>{
        res.send(docs);
    }).catch(
        (err)=>{
            res.status(500).send({
                message:err.message||"Ocurrió un error al obtener todas la noticias"
            });
        }
    )
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets/img/noticias')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
   
  var upload = multer({ storage })

exports.create =(req,res)=>{
<<<<<<< HEAD
    if (!req.body.titulo || !req.body.fecha) {  
=======
    console.log("liksndnkjndsf")
    if (!req.body.titulo || !req.body.fecha) {
>>>>>>> d5bf6c90ed34cde35cc371f7723ed10aecd800a2
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
        return;
    }
    
    const noticia={
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        redireccion:"",
        fecha: req.body.fecha,
    }
    var file =noticia.imagen;
    upload.single("file");
    Noticias.create(noticia).then(
        data=>{
            res.send(data)
        }
    ).catch(
        err=>{
            res.status(500).send({
                message: err.message||"Ocurrio un error al crear la Noticia"
            });
        }
    )
}
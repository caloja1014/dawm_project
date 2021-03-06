const Noticias =require("../../collections/noticias.model");
const multer = require("multer");

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

exports.create =(req,res)=>{
    if (!req.body.titulo || !req.body.fecha) {  
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/img/noticias");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});

exports.uploadNoticias = multer({ storage });
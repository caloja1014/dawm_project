const producto=require("../../models/producto.model")
const multer = require("multer");
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

exports.addProdCarrito = (req,res) =>{
    producto.addProdCliente(req.body,req.userId,(err,data)=>{
        if(err){
            res.status(500).send({
                message: "Ocurrió un error al crear la Direccion"
            })
        }else{
            console.log(data);
            res.status(200).send({message: "Direccion creada con exito"})
        }
    })
}

exports.removeFromCarrito = (req,res) =>{
    if (!req.params.idProducto){
        res.status(400).send({
          message: "No ha mandado ningun producto para sacar del carrito"
        })
      }
    producto.deleteProdFromCarrito(req.params.idProducto, req.userId, (err,data)=>{
        if(err){
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `El producto con id ${req.params.idProducto} no ha sido encontrado en el carrito.`
            });
            } else {
            res.status(500).send({
                message: "Error eliminando el producto del carrito"
            });
            }
        }
        res.send(result);

    })
}

const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/img/productos");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});


exports.uploadPhoto = multer({ storage: storageProduct });


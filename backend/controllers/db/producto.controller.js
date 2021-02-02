const producto = require("../../models/producto.model");
const multer = require("multer");
const sql = require("../../config/databaseCon");

exports.agregarProducto = (req, res) => {
    producto.insertProducto(req.body, req.adminId, (err, result) => {
        if (err) {
            res.status(500).send({
                message:
                    err.toString() ||
                    "Ocurrió un error al ingresar un nuevo producto",
            });
        } else {
            console.log(result);
            res.status(200).send({ message: "Producto ingreso con exito" });
        }
    });
};

exports.addProdCarrito = (req, res) => {
    producto.addProdCliente(req.body, req.userId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Ocurrió un error al anadir el Producto a su carrito",
            });
        } else {
            console.log(data);
            res.status(200).send({ message: "Producto anadido con exito" });
        }
    });
};

exports.removeFromCarrito = (req, res) => {
    if (!req.params.idProducto) {
        res.status(400).send({
            message: "No ha mandado ningun producto para sacar del carrito",
        });
    }
    producto.deleteProdFromCarrito(
        req.params.idProducto,
        req.userId,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `El producto con id ${req.params.idProducto} no ha sido encontrado en el carrito.`,
                    });
                } else {
                    res.status(500).send({
                        message: "Error eliminando el producto del carrito",
                    });
                }
            }
            res.send(data);
        }
    );
};

exports.productosCarrito = (req, res) => {
    producto.getProdCliente(req.userId, (err, resultado) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se han podido obtener los productos del carrito`,
                });
            } else {
                res.status(500).send({
                    message: "Error obteniendo productos",
                });
            }
        }
        let listaProductos=[]
        console.log("se obtuvo de la base: "+resultado);
        for (let p of resultado){
        listaProductos.push({
            id: p.id,
            cantidad:p.cantidad, 
            nombre:p.nomProducto,
            precio:p.precio,
            imagen:p.imagen,
            descripcion:p.descripcion 
        });
        }
        res.send(listaProductos);
    });
};
const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/img/productos");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`); 
    },
});

exports.uploadPhoto = multer({ storage: storageProduct });

exports.getAllProducts = (req, res) => {
    var q = `select c.nombre categoria, c.imagenes, p.id, p.nombre, p.descripcion, p.costoBase precio, p.imagen img
    from Producto p join Categoria c where p.idCategoria = c.id order by categoria;`;
    var products = [];
    sql.query(q, (err, resultado) => {
        if (err) {
            res.status(400).send({
                message: "No se pudo obtener los productos",
            });
        } else {
            for (var reg of resultado) {
                var categExists = false;
                for (let cat of products){

                    if (cat.categoria == reg.categoria) {
                        categExists = true;
                        cat.productos.push({
                            id: reg.id,
                            nombre: reg.nombre,
                            descripcion: reg.descripcion,
                            precio: reg.precio,
                            img: reg.img,
                        });
                    }
                }
                if(!categExists){
                    
                    products.push({
                        categoria: reg.categoria,
                        header: {
                            imagenes: reg.imagenes.split(","),
                        },
                        productos: [
                            {
                                id: reg.id,
                                nombre: reg.nombre,
                                descripcion: reg.descripcion,
                                precio: reg.precio,
                                img: reg.img,
                            },
                        ],
                    });
                }
            }
        }
        res.send(products);
    });
};

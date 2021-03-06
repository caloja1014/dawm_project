const { isValidObjectId } = require("mongoose");
const Dias = require("../../collections/dias.model");
const mesesController = require("./meses.controller");
let productoModel = require("../../models/producto.model");
exports.create = (req, res) => {
    productoModel.getProdCliente(req.userId, (err, resultado) => {
        let listaProductos = [];
        let totalVendido = 0;
        for (let p of resultado) {
            listaProductos.push({
                categoria: p.categoria,
                cantidad: p.cantidad,
                noombre: p.nomProducto,
                precio: p.precio,
            });
            totalVendido += p.cantidad * p.precio;
        }

        var dias = new Date();
        console.log("metodo de pago:" + req.body.metodoPago);
        mesesController.create({
            fecha: dias.toISOString(),
            productos: listaProductos,
            total: totalVendido,
        });
        Dias.updateOne(
            {
                fecha: dias,
            },
            {
                $push: {
                    compras: {
                        id_usu: req.userId,
                        productos: listaProductos,
                        total: totalVendido,
                        metodoPago: req.body.metodoPago,
                    },
                },
            },
            {
                upsert: true,
            }
        )
            .then((data) => {
                productoModel.deleteAllByCliente(req.userId, (err, r) => {
                    if (err) {
                        console.log("error: ", err);
                        res.status(500).send(err);
                        return;
                    }
                    res.send(data);
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Ocurrio un error al crear un nuevo producto",
                });
            });
    });
};

exports.getVentaSemanal = (req, res) => {
    if (!req.body.fecha) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!",
        });
        return;
    }
    var initialDate = new Date(req.body.fecha);
    initialDate.setUTCHours(5);
    var finalDate = new Date(initialDate);
    finalDate.setDate(finalDate.getDate() + 6);
    Dias.find({
        fecha: {
            $gte: initialDate,
            $lte: finalDate,
        },
    })
        .then((data) => {
            res.send(obtenerVentasO(data));
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Ocurrio un error al encontrar las ventas en el dia " +
                        req.body.fecha,
            });
        });
};

exports.getCompraUsuario = (req, res) => {
    Dias.find({
        "compras.id_usu": req.userId,
    })
        .then((data) => {
            let cont = 1;
            let compras = [];
            for (let compraGlobal of data) {
                let comprasArr = compraGlobal["compras"];
                let fecha = new Date(compraGlobal["fecha"])
                    .toISOString()
                    .split("T")[0];

                for (let c of comprasArr) {
                    let idUsuario = c["id_usu"];
                    if (idUsuario == req.userId) {
                        compras.push({
                            id: cont,
                            fecha,
                            total: c["total"].toFixed(2),
                            metodoPago: c["metodoPago"],
                        });
                        cont++;
                    }
                }
            }
            res.send(compras);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al encontrar las ventas",
            });
        });
};
exports.getVentaCategoriaSemanal = (req, res) => {
    console.log(req.params);
    if (!req.query.fecha) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!",
        });
        return;
    }
    var initialDate = new Date(req.query.fecha);
    initialDate.setUTCHours(5);
    var finalDate = new Date(initialDate);
    finalDate.setDate(finalDate.getDate() + 6);
    Dias.find({
        fecha: {
            $gte: initialDate,
            $lte: finalDate,
        },
        "compras.productos.categoria": req.query.categoria,
    })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Ocurrio un error al encontrar las ventas en el dia " +
                        req.query.fecha,
            });
        });
};

let obtenerVentasO = (ventas) => {
    let resultado = {
        Domingo: 0,
        Lunes: 0,
        Martes: 0,
        Miercoles: 0,
        Jueves: 0,
        Viernes: 0,
        Sabado: 0,
    };
    var dias = new Array(7);
    dias[0] = "Domingo";
    dias[1] = "Lunes";
    dias[2] = "Martes";
    dias[3] = "Miercoles";
    dias[4] = "Jueves";
    dias[5] = "Viernes";
    dias[6] = "Sabado";
    for (let venta of ventas) {
        let fecha = venta.fecha;
        let compras = venta.compras;
        for (let compra of compras) {
            let ndia = dias[fecha.getDay()];
            resultado[ndia] += compra.total;
        }
    }
    return resultado;
};

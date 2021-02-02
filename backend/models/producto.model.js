const sql = require("../config/databaseCon");
const categoriaModel = require("./categoria.model");
exports.insertProducto = (producto, idAdmin, result) => {
    categoriaModel.findCategoria(producto.categoria, (er, re) => {
        if (re.length == 0) {
            result(
                new Error(
                    "No existe la categoria que ha ingresado" +
                        producto.categoria
                ),
                null
            );
            return;
        }
        let id = re[0].id;
        const productoInfo = [
            producto.nombre,
            producto.descripcion,
            producto.costoBase,
            producto.imagen,
            producto.estaDisponible,
            id,
            idAdmin,
        ];
        var q =
            "insert into Producto(nombre,descripcion,costoBase,imagen,estaDisponible,idCategoria,idAdmin) values (?);";
        sql.query(q, [productoInfo], (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, res);
            }
        });
    });
};

exports.getProdCliente = (idCliente, result) => {
    var q = `select p.id, p.nombre nomProducto, p.costoBase precio, pc.cantidad cantidad, c.nombre categoria, p.imagen imagen, p.descripcion descripcion
    from Producto p join ProdCliente pc join Categoria c 
    where p.id=pc.producto and p.idCategoria=c.id
    and pc.cliente = ${idCliente};`;
    console.log(idCliente);
    sql.query(q, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log("resultado:" + res);
            result(null, res);
        }
    });
};

exports.addProdCliente = (body, idCliente, result) => {
    console.log(body.idProducto);
    const data = [body.idProducto, idCliente, body.cantidad];
    var q = "insert into ProdCliente(producto,cliente,cantidad) values (?);";
    sql.query(
        "select * from ProdCliente where producto=? and cliente=?",
        [body.idProducto, idCliente],
        (err, res) => {
            if (err) {
                return result(err, null);
            } else {
                if (res.length == 0) {
                    sql.query(q, [data], (err, response) => {
                        if (err) {
                            result(err, null);
                            return;
                        } else {
                            result(null, response);
                        }
                    });
                } else {
                    let nuevaCantidad =
                        parseInt(res[0].cantidad) + parseInt(body.cantidad);
                    sql.query(
                        "UPDATE ProdCliente SET cantidad=? where producto=? and cliente=?",
                        [nuevaCantidad, body.idProducto, idCliente],
                        (err, response) => {
                            if (err) {
                                result(err, null);
                                return;
                            } else {
                                result(null, response);
                            }
                        }
                    );
                }
            }
        }
    );
};

exports.deleteProdFromCarrito = (idProd, idCliente, result) => {
    sql.query(
        `DELETE FROM ProdCliente WHERE producto = ${idProd} and cliente = ${idCliente};`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, res);
        }
    );
};

exports.deleteAllByCliente = (idCliente, result) => {
    sql.query(
        `DELETE FROM ProdCliente WHERE cliente = ${idCliente};`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, res);
        }
    );
};

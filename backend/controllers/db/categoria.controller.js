let categoriaModel = require("../../models/categoria.model");
const multer = require("multer");
const sql = require("../../config/databaseCon");

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

exports.getAllCateg = (req, res) => {
    sql.query("SELECT * from Categoria", (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    });
};

exports.crearCategoria = (req, res) => {
    let categoria = {
        admin: req.adminId,
        imagenes: req.body.imagenes,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    };
    categoriaModel.crearCategoria(categoria, (err, result) => {
        if (err) {
            res.status(500).send({
                message:
                    err.toString() ||
                    "Ocurrió un error al ingresar una nueva categoria",
            });
        } else {
            console.log(result);
            res.status(200).send({ message: "Categoría ingresada con exito" });
        }
    });
};

exports.editarCategoria = (req, res) => {
    sql.query(
        "UPDATE Categoria SET nombre=?, descripcion=? WHERE id=?",
        [req.body.nombre, req.body.descripcion, req.body.id],
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.toString() ||
                        "Ocurrió un error al actualizar la categoria",
                });
            } else {
                res.send(result);
            }
        }
    );
};

exports.eliminarCategoria = (req, res) => {
    sql.query(
        "DELETE FROM Categoria WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message:
                        err.toString() ||
                        "Ocurrió un error al eliminar la categoria",
                });
            } else {
                res.send(result);
            }
        }
    );
};

const storageCateg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/img/categorias");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});

exports.uploadPhotoCateg = multer({ storage: storageCateg });

var express = require("express");
var router = express.Router();

const diasController = require("../controllers/nodb/dias.controller");
const noticiasController = require("../controllers/nodb/noticias.controller");
const mesesController = require("../controllers/nodb/meses.controller");
const adminController = require("../controllers/db/admin.controller");
//router.get("/",noticiasController.findAll);
const categoriaController = require("../controllers/db/categoria.controller");
const productosController = require("../controllers/db/producto.controller");
var auth = require("../middleware/auth");
router.post(
    "/addProduct",
    auth.verifyAdmin,
    productosController.agregarProducto
);

router.put(
    "/editProduct",
    auth.verifyAdmin,
    productosController.editarProducto
);

router.delete(
    "/deleteProduct/:id",
    auth.verifyAdmin,
    productosController.eliminarProducto
);

router.post("/ventaSemanal", auth.verifyAdmin, diasController.getVentaSemanal);
router.post("/addCateg", auth.verifyAdmin, categoriaController.crearCategoria);
router.get("/allCateg", categoriaController.getAllCateg);
router.put("/editCateg", auth.verifyAdmin, categoriaController.editarCategoria);
router.delete(
    "/deleteCateg/:id",
    auth.verifyAdmin,
    categoriaController.eliminarCategoria
);

router.get("/pie", auth.verifyAdmin, mesesController.ventaAnualCategorias);

router.get(
    "/ventaCategoriasSem",
    auth.verifyAdmin,
    diasController.getVentaCategoriaSemanal
);

router.get(
    "/ventaCateg/:categ",
    auth.verifyAdmin,
    mesesController.ventaAnualPorCateg
);

router.post(
    "/addPhoto",
    noticiasController.uploadNoticias.single("file"),
    (req, res) => {
        res.status(200).send({ mensaje: "exitoso" });
    }
);

router.post(
    "/addPhotop",
    productosController.uploadPhoto.single("file"),
    (req, res) => {
        res.status(200).send({ mensaje: "exitoso" });
    }
);

router.post(
    "/addPhotoCateg",
    categoriaController.uploadPhotoCateg.single("file"),
    (req, res) => {
        res.status(200).send({ mensaje: "exitoso" });
    }
);
router.post("/addNew", auth.verifyAdmin, noticiasController.create);

router.get("/profile", auth.verifyAdmin, adminController.getProfile);
router.post("/login", adminController.loginAdmin);
module.exports = router;

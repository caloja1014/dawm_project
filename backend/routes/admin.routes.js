var express = require("express");
var router = express.Router();



const diasController = require("../controllers/nodb/dias.controller");
const noticiasController = require("../controllers/nodb/noticias.controller");
const mesesController = require("../controllers/nodb/meses.controller");
const adminController = require("../controllers/db/admin.controller");
//router.get("/",noticiasController.findAll);
const categoriaController = require("../controllers/db/categoria.controller");
const productosController = require("../controllers/db/producto.controller");
var auth = require("../middleware/auth")
router.post("/addProduct", auth.verifyAdmin,productosController.agregarProducto);
router.post("/ventaSemanal", diasController.getVentaSemanal);
router.post("/addCateg",auth.verifyAdmin, categoriaController.crearCategoria);
router.get("/pie", mesesController.ventaAnualCategorias);

router.get("/ventaCategoriasSem", diasController.getVentaCategoriaSemanal);

router.get("/ventaCateg/:categ", mesesController.ventaAnualPorCateg);

router.post("/addPhoto", noticiasController.uploadNoticias.single("file"), (req, res) => {
    res.status(200).send({ mensaje: "exitoso" });
});

router.post("/addPhotop", productosController.uploadPhoto.single("file"), (req, res) => {
    res.status(200).send({ mensaje: "exitoso" });
});

router.post("/addPhotoCateg", categoriaController.uploadPhotoCateg.single("file"), (req, res) => {
    res.status(200).send({ mensaje: "exitoso" });
});

router.post("/addNew", noticiasController.create);

router.post("/login", adminController.loginAdmin);
module.exports = router;

var express = require('express');
var router = express.Router();
const multer = require('multer');

const diasController= require("../controllers/nodb/dias.controller");
const noticiasController= require("../controllers/nodb/noticias.controller");
const mesesController=require("../controllers/nodb/meses.controller")
const adminController = require("../controllers/db/admin.controller");
//router.get("/",noticiasController.findAll);
const categoriaController=require("../controllers/db/categoria.controller")
const productosController =require("../controllers/db/producto.controller");

router.post("/addProduct",productosController.agregarProducto)
router.post("/ventaSemanal",diasController.getVentaSemanal);
router.post("/addCateg",categoriaController.crearCategoria);
router.get("/pie",mesesController.ventaAnualCategorias);

router.post("/addProduct", diasController.create);

router.post("/ventaSemanal", diasController.getVentaSemanal);


router.get("/ventaCategoriasSem", diasController.getVentaCategoriaSemanal)

router.get("/ventaCateg/:categ", mesesController.ventaAnualPorCateg);



//router.post("/addNew",noticiasController.create);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/img/noticias");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

//var upload = multer({ dest: "uploads/" });

var upload = multer({ storage: storage });
router.post("/addPhoto", upload.single("file"));

router.post("/addNew", noticiasController.create);

router.post("/login",adminController.loginAdmin);
module.exports = router;

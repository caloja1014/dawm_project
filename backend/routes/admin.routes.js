var express = require('express');
var router = express.Router();

const diasController= require("../controllers/nodb/dias.controller");
const noticiasController= require("../controllers/nodb/noticias.controller");
const mesesController=require("../controllers/nodb/meses.controller")
//router.get("/",noticiasController.findAll);
const productosController =require("../controllers/db/producto.controller");

router.post("/addProduct",productosController.agregarProducto)
router.post("/ventaSemanal",diasController.getVentaSemanal);


router.get("/ventaCategoriasSem",diasController.getVentaCategoriaSemanal)

router.get("/ventaCateg/:categ",mesesController.ventaAnualPorCateg);



router.post("/addNew",noticiasController.create);



module.exports = router;

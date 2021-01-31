var express = require('express');
var router = express.Router();

const diasController= require("../controllers/nodb/dias.controller");
const noticiasController= require("../controllers/nodb/noticias.controller");
const mesesController=require("../controllers/nodb/meses.controller")
//router.get("/",noticiasController.findAll);
router.post("/addProduct",diasController.create);

router.post("/ventaSemanal",diasController.getVentaSemanal);

router.get("/porusu",diasController.getCompraUsuario);

router.get("/ventaCategoriasSem",diasController.getVentaCategoriaSemanal)

router.get("/ventaCateg/:categ",mesesController.ventaAnualPorCateg);


router.get("/news",noticiasController.findAll);
router.post("/addNew",noticiasController.create);



module.exports = router;

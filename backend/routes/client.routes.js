var express = require('express');
var router = express.Router();
var cliente = require("../controllers/db/cliente.controller")
var auth = require("../middleware/auth")
const diasController= require("../controllers/nodb/dias.controller");
const noticiasController= require("../controllers/nodb/noticias.controller");

/* GET home page. */

router.post('/register', cliente.createClient);
router.post('/login',cliente.loginClient);
router.put('/profile',auth.verifyToken,cliente.updateClient);
router.get('/profile',auth.verifyToken,cliente.getProfile);
router.post("/comprar",diasController.create);
//router.get("/pedidos",auth.verifyToken,diasController.getCompraUsuario);
router.get("/pedidos",diasController.getCompraUsuario);

router.get("/news",noticiasController.findAll);
module.exports = router;
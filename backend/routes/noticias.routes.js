var express = require('express');
var router = express.Router();

const noticiasController= require("../controllers/nodb/noticias.controller");

router.get("/",noticiasController.findAll);
router.post("/",noticiasController.create);
module.exports = router;

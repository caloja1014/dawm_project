var express = require('express');
var router = express.Router();

const diasController= require("../controllers/nodb/dias.controller");

//router.get("/",noticiasController.findAll);
router.post("/",diasController.create);
module.exports = router;

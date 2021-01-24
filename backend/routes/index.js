var express = require('express');
var router = express.Router();
var cliente = require("../controllers/db/cliente.controller")
/* GET home page. */

router.post('/register', cliente.createCliente);
router.post('/login',cliente.loginCliente);

module.exports = router;
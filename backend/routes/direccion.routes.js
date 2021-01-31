var express = require('express');
var router = express.Router();
var direccion = require("../controllers/db/direccion.controller")
var auth = require("../middleware/auth")
/* GET home page. */

router.get('/', auth.verifyToken ,direccion.getDireccion);
router.post('/', auth.verifyToken, direccion.crearDireccion);
router.put('/', auth.verifyToken, direccion.actualizarDireccion);
router.delete('/:id', direccion.deleteDireccion);
module.exports = router;
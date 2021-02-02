var express = require('express');
var router = express.Router();
var producto = require("../controllers/db/producto.controller")
var auth = require("../middleware/auth")

router.post("/add",auth.verifyToken,producto.addProdCarrito);

router.delete("/:idProducto",producto.removeFromCarrito);
router.get("/prods",auth.verifyToken,producto.productosCarrito)
module.exports=router;
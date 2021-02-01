var express = require('express');
var router = express.Router();
var producto = require("../controllers/db/producto.controller")

router.post("/add",producto.addProdCarrito);

router.delete("/:idProducto",producto.removeFromCarrito);
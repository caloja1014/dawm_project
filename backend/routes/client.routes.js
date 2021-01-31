var express = require('express');
var router = express.Router();
var cliente = require("../controllers/db/cliente.controller")
var auth = require("../middleware/auth")
/* GET home page. */

router.post('/register', cliente.createClient);
router.post('/login',cliente.loginClient);
router.put('/profile',auth.verifyToken,cliente.updateClient);
router.get('/profile',auth.verifyToken,cliente.getProfile);

module.exports = router;
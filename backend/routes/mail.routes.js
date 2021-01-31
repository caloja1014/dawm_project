var express = require('express');
var router = express.Router();
let mailController=require("../controllers/utilities/mail.controller")
router.post("/",mailController.enviarCorreo);



module.exports=router;
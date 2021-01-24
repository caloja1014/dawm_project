var mongoose = require("mongoose");

var MesesSchemema = new mongoose.Schema({
    fecha:{
        type:String
    },
    categorias:{
        type: Array
    },
    total:Number

})

module.exports= mongoose.model("meses",MesesSchemema,"meses");

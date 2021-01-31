var mongoose = require("mongoose");

var MesesSchemema = new mongoose.Schema({
    anio:Number,
    mes:Number,
    categorias:{
        type: Array
    },
    total:Number

})

module.exports= mongoose.model("meses",MesesSchemema,"meses");

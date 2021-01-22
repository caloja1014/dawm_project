var mongoose = require("mongoose");

var MesesSchemema = new mongoose.Schema({
    anio:{
        type:String
    },
    meses:{
        type: Object
    }
})
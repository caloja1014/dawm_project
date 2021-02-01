var mongoose = require("mongoose");

const DiasSchema= new mongoose.Schema ({
    fecha:{
        type:Date
    },
    compras:[{
        id_usu:String,
        productos:Array,
        total:Number,
        metodoPago:String
    }]
});
module.exports= mongoose.model("dias",DiasSchema,"dias");
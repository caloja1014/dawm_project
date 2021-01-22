var mongoose = require("mongoose");

const DiasSchema= new mongoose.Schema ({
    fecha:{
        type:Date
    },
    compras:[Object]
});
module.exports= mongoose.model("dias",DiasSchema,"dias");
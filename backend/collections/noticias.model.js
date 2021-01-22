var mongoose = require("mongoose");

const NoticiaSchema = new mongoose.Schema({
    imagen: {
        type: String,
    },
    titulo: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    redireccion: {
        type: String,
    },
    fecha: {
        type: Date,
        
    },
});

module.exports= mongoose.model("noticias",NoticiaSchema,"noticias");


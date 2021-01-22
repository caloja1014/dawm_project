const nodbConfig = require("../config/nodb.config");
const mongoose = require('mongoose');

const db_path = nodbConfig.dialect +'+srv://'+nodbConfig.USER+":"+nodbConfig.PASSWORD+"@" + nodbConfig.HOST + '/' + nodbConfig.noDB;
const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 4
}
mongoose.connect(db_path, config)
    .then(() => console.log('Conexión a la base de datos exitosa!'))
    .catch(err => {
        console.error.bind(console, 'MongoDB connection error:')
    });
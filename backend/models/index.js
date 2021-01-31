/*const dbConfig = require("../config/db.config.js");

const Sequelize = require("Sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operartorAliases: false,

    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db  = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cliente = requiere("./cliente.model.js");

module.exports = db;*/
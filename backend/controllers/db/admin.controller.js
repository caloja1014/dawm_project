const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const admin = require("../../models/admin.model");
exports.loginAdmin = (req, res) => {
    admin.findByUser(req.body.username, (err, result) => {
        if (err) {
            res.send(err);
        } else if (!result) {
            res.status(401).send("Correo Invalido");
        } else if (req.body.password != result[0].password) {
            //result es un arreglo
            res.status(401).send("Contrasena Invalida");
        } else {
            let payload = { adminId: result[0].id };
            token = jwt.sign(payload, "adminKey");
            res.status(200).send({ token });
        }
    });
};

exports.getProfile = (req, res) => {
    console.log("aa");
    admin.findById(req.adminId, (err, result) => {
        if (err) {
            res.send(err);
        } else if (!result) {
            res.status(401).send("Token Invalido");
        } else {
            res.send(result);
        }
    });
};

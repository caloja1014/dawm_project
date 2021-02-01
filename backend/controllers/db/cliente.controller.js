const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const client = require("../../models/cliente.model");

exports.createClient = (req, res) => {
    
    client.insertCliente(req.body.email, req.body.password, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err,
            });
        } else {
            let payload = { userId: result.insertId };
            let token = jwt.sign(payload, "merakiProject");

            res.status(200).send({ token });
        }
    });
};

exports.loginClient = (req, res) => {
    console.log(req.body)
    client.findByEmail(req.body.email, (err, result) => {
        if (err) {
            res.status(401).send("Correo Invalido");
        } else if (!result || result.length==0) {
            res.status(401).send("Correo Invalido");
        } else if (req.body.password != result[0].password) {
            //result es un arreglo
            res.status(401).send("Contrasena Invalida");
        }
        else {
            let payload = { userId: result[0].id };
            token = auth.sign(payload);
            res.status(200).send({ token });
        }
    });
};

exports.updateClient = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    client.update(req.userId, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `El cliente con id ${req.userId} no ha sido encontrado.`,
                });
            }
            else if (err.kind === "username_exists"){
                res.status(501).send({
                    message: "El username elegido ya existe"
                })
            }
             else {
                res.status(500).send({
                    message:
                        "Error actualizando al Cliente con id ${req.userId}",
                });
            }
        } else res.send(data);
    });
};

exports.getProfile = (req, res) => {
    client.getById(req.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Customer with id " +
                        req.params.customerId,
                });
            }
        } else res.send(data);
    });
};

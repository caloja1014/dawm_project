var nodemailer = require("nodemailer");

exports.enviarCorreo = (req, res) => {
    console.log(req.body);
    if (!req.body.email) {
        res.status(400).send({
        message: "El contenido no puede estar vacio!",
        });
        return;
    }
    let bodymail = req.body;
    var transporter = nodemailer.createTransport({
        service: "hotmail",

        auth: {
        user: "meraki_gifts12@outlook.com",
        pass: "Paguevara129",
        },
    });

    var mailOptions = {
        from: "meraki_gifts12@outlook.com",
        to: "meraki_gifts12@outlook.com",
        subject: "Compra",
        text: `Correo: ${bodymail.email}\nNombre: ${bodymail.name}\nTelefono: ${bodymail.telf}\nDirección: ${bodymail.origin}\nMensaje: ${bodymail.msg}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        console.log(error);
        res.send(500, err.message);
        } else {
        console.log("Email sent");
        res.status(200).send({
            message:"Mensaje enviado exitosamente"
        });
        }
    });
};

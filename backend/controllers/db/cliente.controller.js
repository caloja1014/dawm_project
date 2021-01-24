const sql = require("../../config/databaseCon");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");


exports.createCliente = (req,res) =>{
    const cliente = [
        req.body.email,
        req.body.password
    ]
    var q = "insert into Cliente(email,password) values (?);"
    sql.query(q, [cliente], (err,result)=>{
        if(err){
            res.status(500).send({
                message: "Ocurrió un error al crear el Cliente"
            })
        }else{
            let payload = {user: cliente[0]}
            let token = jwt.sign(payload, "merakiProject");
            
            res.status(200).send({token})
        }

    })
}


exports.loginCliente = (req,res) =>{
    const cliente = [
        req.body.email,
        req.body.password
    ]
    var q = "select * from Cliente where email = '"+req.body.email+"';"
    sql.query(q,(err,result)=>{
        if(err){
            res.send(err);
        }else if(!result){
            res.status(401).send("Correo Invalido")
        }else if (cliente[1] != result[0].password){ //result es un arreglo 
            res.status(401).send("Contrasena Invalida")
        }else{
            token = auth.sign(cliente[0]);
            res.status(200).send({token})
        }
    })

}


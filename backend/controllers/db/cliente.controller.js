const sql = require("../../config/databaseCon");


exports.createCliente = (req,res) =>{
    console.log(req.body)
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
            res.status(200).send({
                message: "Cliente insertado con exito"
            })
        }

    })
}
const dir = require("../../models/direccion.model")

exports.crearDireccion = (req,res) =>{
    console.log(req.body.direccion)
    dir.insertDireccion = (5,req.body.direccion,(err,result)=>{
        if(err){
            res.status(500).send({
                message: "Ocurrió un error al crear la Direccion"
            })
        }else{
            res.status(200).send({message: "Direccion creada con exito"})
        }
    })
}

exports.getDireccion = (req,res) =>{
    dir.getById(req.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      });
}


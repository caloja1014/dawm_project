const dir = require("../../models/direccion.model")

exports.crearDireccion = (req,res) =>{
    dir.insertDireccion(req.userId,req.body.direccion,(err,result)=>{
        if(err){
            res.status(500).send({
                message: "Ocurrió un error al crear la Direccion"
            })
        }else{
            console.log(result);
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

exports.actualizarDireccion = (req,res) =>{
  if(!req.body){
    res.status(400).send({
      message: "La direccion no existe"
    })
  }else if (req.body.direccion == ""){
    res.status(400).send({
      message: "La direccion esta vacia"
    })
  }
  dir.updateDireccion(req.body,(err,result)=>{
    if(err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `La direccion con id ${req.body.id} no ha sido encontrada.`
        });
      } else {
        res.status(500).send({
          message: "Error actualizando la direccion"
        });
      }
    } else res.status(200).send(result);
  })
}


exports.deleteDireccion = (req,res) =>{
  if (!req.body){
    res.status(400).send({
      message: "No ha mandado ninguna direccion"
    })
  }
  dir.deleteDireccion(req.params.id,(err,result)=>{
    if(err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `La direccion con id ${req.body.id} no ha sido encontrada.`
        });
      } else {
        res.status(500).send({
          message: "Error eliminando la direccion"
        });
      }
    }
    res.send(result);
  })
}

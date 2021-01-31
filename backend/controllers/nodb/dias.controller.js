const Dias = require("../../collections/dias.model");
const mesesController= require("./meses.controller")
exports.create = (req, res) => {
  if (!req.body.id_usu || !req.body.fecha) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!",
    });
    return;
  }

  var dias = new Date(req.body.fecha);
  dias.setUTCHours(5);
  mesesController.create(req.body).then(
    (data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Ocurrio un error al crear un nuevo producto e indexarlo en la coleccion de meses",
    });
  });
  
  Dias.updateOne(
    {
      fecha: dias,
    },
    {
      $push: {
        compras: {
          ncompra: req.body.ncompra,
          id_usu: req.body.id_usu,
          productos: req.body.productos,
          total: req.body.total,
        },
      },
    },
    {
      upsert: true,
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al crear un nuevo producto",
      });
    });
};

exports.getVentaSemanal = (req, res) => {
  if (!req.body.fecha) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!",
    });
    return;
  }
  var initialDate = new Date(req.body.fecha);
  initialDate.setUTCHours(5);
  var finalDate = new Date(initialDate);
  finalDate.setDate(finalDate.getDate() + 6);
  Dias.find({
    fecha: {
      $gte: initialDate,
      $lte: finalDate,
    },
  })
    .then((data) => {
      res.send(obtenerVentasO(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrio un error al encontrar las ventas en el dia " +
            req.body.fecha,
      });
    });
};

exports.getCompraUsuario = (req, res) => {
  console.log(req.query);
  if (!req.query.id_usu) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!",
    });
    return;
  }
  Dias.find({
    "compras.id_usu": req.query.id_usu,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrio un error al encontrar las ventas en el dia " +
            req.query.fecha,
      });
    });
};
exports.getVentaCategoriaSemanal=(req,res)=>{
  console.log(req.params);
  if (!req.query.fecha) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!",
    });
    return;
  }
  var initialDate = new Date(req.query.fecha);
  initialDate.setUTCHours(5);
  var finalDate = new Date(initialDate);
  finalDate.setDate(finalDate.getDate() + 6);
  Dias.find(
    {
      fecha: {
        $gte: initialDate,
        $lte: finalDate,
      },
      "compras.productos.categoria":req.query.categoria,
    }
  ).then(
    data=>{
      console.log(data);
      res.send(data)
    }
  ).catch(
    (err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrio un error al encontrar las ventas en el dia " +
            req.query.fecha,
      });
    }
  )

}




let obtenerVentasO = (ventas) => {
  let resultado = {
    Domingo: 0,
    Lunes: 0,
    Martes: 0,
    Miercoles: 0,
    Jueves: 0,
    Viernes: 0,
    Sabado: 0,
  };
  var dias = new Array(7);
  dias[0] = "Domingo";
  dias[1] = "Lunes";
  dias[2] = "Martes";
  dias[3] = "Miercoles";
  dias[4] = "Jueves";
  dias[5] = "Viernes";
  dias[6] = "Sabado";
  for (let venta of ventas) {
    let fecha = venta.fecha;
    let compras = venta.compras;
    for (let compra of compras) {
      let ndia = dias[fecha.getDay()];
      resultado[ndia] += compra.total;
    }
  }
  return resultado;
};

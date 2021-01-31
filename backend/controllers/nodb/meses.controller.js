const Meses = require("../../collections/meses.model");

let createByFecha=async (compra)=>{
    let fecha=compra.fecha.split("-")
    let anio=Number.parseInt(fecha[0])
    let mes=Number.parseInt(fecha[1])
    let productos=compra.productos
    let lCategorias=[]
    let dCategorias={}
    var totalGlobal=0
    for (let producto of productos){
        let categoria=producto.categoria;
        let cantidad=producto.cantidad;
        let precio=producto.precio;
        categoria in dCategorias || (dCategorias[categoria] = {total:0,noVendido:0});
        dCategorias[categoria].total+=precio*cantidad;
        dCategorias[categoria].noVendido+=cantidad;
        totalGlobal+=precio*cantidad
    }
    for (let cat in dCategorias){
        let atributos=dCategorias[cat]
        lCategorias.push({
            categoria:cat,
            total:atributos.total,
            noVendido:atributos.noVendido
        })
    }

    return await Meses.create(
        {
            anio:anio,
            mes:mes,
            categorias:lCategorias,
            total:totalGlobal
        }
    )
}

let createByCategory=async (producto,fecha)=>{
    console.log(producto)
    let fehcaSep=fecha.split("-");
    let anio=Number.parseInt(fehcaSep[0]);
    let mes=Number.parseInt(fehcaSep[1]);
    return await Meses.updateOne(
        {
            anio:anio,
            mes:mes,
        },
        {
            $push: {
                categorias: {
                    categoria:producto.categoria,
                    total:producto.precio*producto.cantidad,
                    noVendido:producto.cantidad
                },
            },
            $inc: {
                total:producto.precio*producto.cantidad
                },
        },
        {
            upsert: true,
        }
        )
}

exports.create = async (compra) => {
    let productos = compra.productos;
    var fecha = new Date(compra.fecha);
    fecha.setUTCHours(5);
    let mes = fecha.getMonth() + 1;
    let fechaBuscar = fecha.getFullYear() + "-" + mes;
    let anio=fecha.getFullYear();
    let fechaExist=await Meses.exists({
        anio:anio,
        mes:mes,
    });
    if (!fechaExist){
        return await createByFecha(compra)
    }

    for (let producto of productos) {
        let exist=await Meses.exists({
        anio:anio,
        mes:mes,
        "categorias.categoria": producto.categoria,
        });
        if (exist &&fechaExist ) {
            return await Meses.findOneAndUpdate(
            {
                anio:anio,
                mes:mes,
                "categorias.categoria": producto.categoria,
            },
            {
                $inc: {
                "categorias.$.noVendido": producto.cantidad,
                "categorias.$.total": producto.cantidad*producto.precio,
                total: compra.total,
                },
            },
            {
                upsert: true,
            }
            )
        }
        else{
            return await createByCategory(producto,fechaBuscar);
        }
    }
};

exports.ventaAnualPorCateg=(req,res)=>{
    if(!req.params.categ){
        res.status(400).send({
            message: "El contenido no puede estar vacio!",
        });
        return;
    }
    let anio=(new Date()).getFullYear();
console.log(anio+"saff"+req.params.categ);
    Meses.find(
        {
            anio:anio,
            "categorias.categoria":req.params.categ,
        }
    ).then(
        data=>{
            let result=obtenerVentasAnual(data,req.params.categ);
            res.send(result);

        }
    ).catch(
        err=>{
        res.status(500).send({
            message:
                err.message ||
                "Ocurrio un error al encontrar las ventas anuales de la categoría " +
                req.params.categ,
            });
        }
    );
}

let obtenerVentasAnual=(data,categoria)=>{
    let resultado = {
        Enero: 0,
        Febrero: 0,
        Marzo: 0,
        Abril: 0,
        Mayo: 0,
        Junio: 0,
        Julio: 0,
        Agosto:0,
        Septiembre:0,
        Octubre:0,
        Noviembre:0,
        Diciembre:0,
      };
      var meses = new Array(12);
      meses[0] = "Enero";
      meses[1] = "Febrero";
      meses[2] = "Marzo";
      meses[3] = "Abril";
      meses[4] = "Mayo";
      meses[5] = "Junio";
      meses[6] = "Julio";
      meses[7] = "Agosto";
      meses[8] = "Septiembre";
      meses[9] = "Octubre";
      meses[10] = "Noviembre";
      meses[11] = "Diciembre";

    for (let cat of data){
        let categorias=cat["categorias"]
        let mes=cat["mes"]-1
        for (let c of categorias){
            if (c["categoria"]==categoria){
                resultado[meses[mes]]+=c["total"]
            }
        }

    }
    return resultado;
}
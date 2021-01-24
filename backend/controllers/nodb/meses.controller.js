const Meses = require("../../collections/meses.model");

let createByFecha=async (compra)=>{
    let fecha=compra.fecha.split("-",2).join("-")
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
            fecha:fecha,
            categorias:lCategorias,
            total:totalGlobal
        }
    )
}

let createByCategory=async (producto,fecha)=>{
    console.log(producto)
    return await Meses.updateOne(
        {
            fecha: fecha,
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

    let fechaExist=await Meses.exists({
        fecha: fechaBuscar,});
    if (!fechaExist){
        return await createByFecha(compra)
    }

    for (let producto of productos) {
        let exist=await Meses.exists({
        fecha: fechaBuscar,
        "categorias.categoria": producto.categoria,
        });
        if (exist &&fechaExist ) {
            return await Meses.findOneAndUpdate(
            {
                fecha: fechaBuscar,
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

const Dias =require("../../collections/dias.model")

exports.create=((req,res)=>{
    console.log(req.body);
    Dias.updateOne({
        fecha:req.body.fecha,
    },
    {
        $push:{
            compras:{
                ncompra:5,
                id_usu:"dsffsdsfs",
                productos:[
                    {
                        categoria: "textiles",
                        cantidad: 2,
                        nombre: "camisa",
                        precio: 10
                    }
                ],
                total:20
            }
        }
    }
    )
})
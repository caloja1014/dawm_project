var json;
let cargarJSON = () =>{
    fetch("../data/productos.json")
    .then((data) => {
        return data.json()
    })
    .then((productos)=>{


        json = productos;
        let carousel = document.getElementById("carousel-products");
        let firstCateg = productos[0];
        let contimg = 0;
        let carouselIndicators = document.getElementsByClassName("carousel-indicators")[0];
        carouselIndicators.innerHTML = "";
        for(let imgCarousel of firstCateg.header.imagenes){
            let active = contimg++==0? "active":"";
            carouselIndicators+=
            '<li data-target="#carouselExampleIndicators" data-slide-to="'+contimg-1+'" class="'+active+'"></li>';
            carousel.innerHTML+=
                '<div class="carousel-item '+active+'">'+
                    '<img class="d-block img-fluid" src="./assets/productos/'+firstCateg.categoria+'/'+imgCarousel+'" alt="First slide">'+
                '</div>';
        }

        
        let categorias = document.getElementById("categorias");
        let divproductos = document.getElementById("productos");
        let cont = 0;
        for (let elemento of productos){
            let seleccionado = cont++==0?"categ-seleccionada":"";
            categorias.innerHTML+= '<a href="#" id="'+elemento.categoria+'" class="list-group-item '+seleccionado+'">'+ elemento.categoria +'</a>'
            let divCategoria = document.createElement("div");
            divCategoria.id = "div"+elemento.categoria;
            if(cont>1){
                divCategoria.style.display = "none";
            }
            divCategoria.className = "row";
            divproductos.appendChild(divCategoria);            
            for (let producto of elemento.productos){
                divCategoria.innerHTML += 
                    '<div class="col-lg-4 col-md-6 mb-4">'+
                        '<div class="card h-100">'+
                            '<a href="#"><img class="card-img-top" src=./assets/productos/'+elemento.categoria+'/'+producto.img +' alt=""></a>'+
                            '<div class="card-body">'+
                                '<div class="card-top">'+
                                    '<h4 class="card-title">'+
                                        '<a href="#">'+producto.nombre+'</a>'+
                                    '</h4>'+
                                    '<h5>$'+producto.precio+'</h5>'+
                                    '<p class="card-text">'+producto.descripcion+'</p>'+
                                '</div>'+
                                '<a class="button btn-comprar">Comprar</a>'
                            '</div>'+
                        '</div>'+
                    '</div>'                   
            }
        }
        let divCategoria = document.createElement("div");
        divCategoria.id = "divBusqueda";
        divCategoria.className = "row";
        divCategoria.style.display = "none";
        divproductos.appendChild(divCategoria); 
        
    }).then(()=>{
        onclicks();
        comprar();
    })
    .catch((e)=>{
        console.log(e);
        let divproductos = document.getElementById("page-top");
        divproductos.innerHTML = "<h1 class='py-5'>Woops ha ocurrido un error, por favor vuelva más tarde.";
    })
}



document.addEventListener('DOMContentLoaded', ()=> {
    cargarJSON();
});


var buscador = document.getElementById("inputProducto")

buscador.oninput=()=>{
    let value =buscador.value.toUpperCase();
    let categorias = document.getElementById("categorias");
    let catSelect=categorias.getElementsByClassName("categ-seleccionada");
    
    let divproductos = document.getElementById("productos");
    let divBusqueda= document.getElementById("divBusqueda");
    if(value==""){
        let idDiv=catSelect[0].id;
        document.getElementById("div"+idDiv).style.display="";
        divBusqueda.innerHTML="";
    }
    else{
        let productos=divproductos.getElementsByClassName("row");
        for (let p of productos){
            p.style.display="none"
        }
        divBusqueda.innerHTML="";
        divBusqueda.style.display = "";
        for (let elemento of json){
            for (let producto of elemento.productos){
                let nombProducto=producto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                if (nombProducto.includes(value)){

                    divBusqueda.innerHTML += 
                    '<div class="col-lg-4 col-md-6 mb-4">'+
                        '<div class="card h-100">'+
                            '<a href="#"><img class="card-img-top" src=./assets/productos/'+elemento.categoria+'/'+producto.img +' alt=""></a>'+
                            '<div class="card-body">'+
                                '<div class="card-top">'+
                                    '<h4 class="card-title">'+
                                        '<a href="#">'+producto.nombre+'</a>'+
                                    '</h4>'+
                                    '<h5>$'+producto.precio+'</h5>'+
                                    '<p class="card-text">'+producto.descripcion+'</p>'+
                                '</div>'+
                                '<a class="button btn-comprar">Comprar</a>'
                            '</div>'+
                        '</div>'+
                    '</div>' 
                }                  
                

            }
        }
    }
    
}



function comprar(){
    for(let item of json){
        let categ = item.categoia;
        let divcateg = document.getElementById("div"+item.categoria);
        let productos = divcateg.children;
        for(let divProducto of productos){
            let btnComprar = divProducto.getElementsByClassName("button")[0];
            btnComprar.onclick = ()=>{
                if(btnComprar.classList.contains("btn-comprado")){
                    btnComprar.classList.remove("btn-comprado");
                    btnComprar.innerHTML = "Comprar";
                }else{
                    btnComprar.classList.add("btn-comprado");
                    btnComprar.innerHTML = "Seleccionado";
                }
            }
        }
    }
}

function onclicks(){
    for(let item of json){
        
        let a = document.getElementById(item.categoria);
        
        a.onclick = ()=>{
            let carousel = document.getElementById("carousel-products");
            
            let carouselIndicators = document.getElementsByClassName("carousel-indicators")[0];
            carouselIndicators.innerHTML = "";
            carousel.innerHTML = "";
            let cont = 0
            for(let imgCarousel of item.header.imagenes){
                let active = cont++==0? "active":"";
                carouselIndicators+=
                '<li data-target="#carouselExampleIndicators" data-slide-to="'+cont-1+'" class="'+active+'"></li>';

                carousel.innerHTML+=
                    '<div class="carousel-item '+active+'">'+
                        '<img class="d-block img-fluid" src="./assets/productos/'+item.categoria+'/'+imgCarousel+'" alt="First slide">'+
                    '</div>';
            }
            categString = item.categoria;
            let products = document.getElementById("productos");
            for(let item2 of json){
                let divcateg = document.getElementById("div"+item2.categoria);
                let itemCateg = document.getElementById(item2.categoria);
                if(item2.categoria!=categString){
                    divcateg.style.display = "none";
                    itemCateg.classList.remove("categ-seleccionada")
                }else{
                    divcateg.style.display = "";
                    itemCateg.classList.add("categ-seleccionada")
                }
            }
        };
    }
}

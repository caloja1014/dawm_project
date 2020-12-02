var json;
let cargarJSON = () =>{
    console.log("Hola111111111");
    fetch("../data/Productos.json")
    .then((data) => {
        return data.json()
    })
    .then((productos)=>{
        console.log("Hola");
        json = productos;
        let carousel = document.getElementById("carousel-products");
        let firstCateg = productos[0];
        for(let imgCarousel of firstCateg.header.imagenes){
            console.log("memeti");
            carousel.innerHTML+=
            '<div class="carousel-item active">'+
                '<img class="d-block img-fluid" src="'+imgCarousel+'" alt="First slide">'+
            '</div>';   
            console.log(carousel.innerHTML);           
        }

        
        let categorias = document.getElementById("categorias");
        let divproductos = document.getElementById("productos");
        let cont = 0;
        for (let elemento of productos){
            cont++;
            categorias.innerHTML+= '<a href="#" id="'+elemento.categoria+'" class="list-group-item">'+ elemento.categoria +'</a>'
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
                                '<h4 class="card-title">'+
                                    '<a href="#">'+producto.nombre+'</a>'+
                                '</h4>'+
                                '<h5>$'+producto.precio+'</h5>'+
                                '<p class="card-text">'+producto.descripcion+'</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'                   
            }
        }
    
        
    }).then(()=>{
        onclicks();
    })
}

/*
<div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <a href="#"><img class="card-img-top" src="../../JSONs/imgs/arbol1.jpg" alt=""></a>
                <div class="card-body">
                  <h4 class="card-title">
                    <a href="#">Item One</a>
                  </h4>
                  <h5>$24.99</h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                </div>
              </div>
            </div>


*/

document.addEventListener('DOMContentLoaded', ()=> {
    console.log("Holaa");
    cargarJSON();
});

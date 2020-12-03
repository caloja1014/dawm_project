function someFunction21() {
    setTimeout(function () {
    $('#horizontal-stepper').nextStep();
    }, 2000);
}


function seleccionar(){   
    let ul = document.getElementById("steepers-comprar");
   
    for (let li of ul.children){
        let a = li.getElementsByTagName("a")[0];   
        let id;
        a.onclick = ()=>{
            let secciones = document.getElementById("secciones");                       
            for (let sec of secciones.children){                                
                if(sec.id == "seccion"+a.id){
                                    
                    sec.style.display = " " ;
                    li.classList.add("active");
                    sec.classList.remove("seccioninactiva")
                }else{
                    sec.classList.add("seccioninactiva");
                }
            }
            
        }
        
    }
    

}

seleccionar();

function cargarcomprados(){
    fetch("../data/compra.json")
    .then((data) => {
        return data.json()
    })
    .then((productos)=>{
        
        let section = document.getElementById("divproductos");
        for (let producto of productos){
            section.innerHTML += 
            '<div class="col-lg-4 col-md-6 mb-4">'+
                '<div class="card h-100">'+
                    '<a href="#"><img class="card-img-top" src=./assets/productos/'+producto.categoria+'/'+producto.img +' alt=""></a>'+
                    '<div class="card-body">'+
                        '<div class="card-top">'+
                            '<h4 class="card-title">'+
                                '<a href="#">'+producto.nombre+'</a>'+
                            '</h4>'+
                            '<h5>$'+producto.precio+'</h5>'+
                            '<p class="card-text">'+producto.descripcion+'</p>'+
                        '</div>'+                       
                    '</div>'+
                '</div>'+
            '</div>';
        }
        
    });
}


document.addEventListener('DOMContentLoaded', ()=> {
    cargarcomprados();
});


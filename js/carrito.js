function someFunction21() {
    setTimeout(function () {
    $('#horizontal-stepper').nextStep();
    }, 2000);
}

function seleccionar(){   
    let ul = document.getElementById("steepers-comprar");
    for (let li of ul.children){
        let a = li.getElementsByTagName("a")[0];   

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
            '<div class="card mb-3 m-3" style="max-width: 500px;">'+
                '<div class="row no-gutters">'+
                    '<div class="div-card-img"><img class="card-img" src=./assets/productos/'+producto.categoria+'/'+producto.img +' alt=""></div>'+
                        '<div class="card-body">'+
                            '<h4 class="card-title">'+
                                '<a href="#">'+producto.nombre+'</a>'+
                            '</h4>'+
                            '<h5>$'+producto.precio+'</h5>'+
                            '<p class="card-text">'+producto.descripcion+'</p>'+
                        '</div>'+                       
                '</div>'+
            '</div>';
        }
        
    });
}


document.addEventListener('DOMContentLoaded', ()=> {
    cargarcomprados();
});


function metodopago(){
    let metodos = document.getElementById("metodos")
    for(let met of metodos.children){
        met.onclick = ()=>{        
            console.log(met) ; 
            if(met.classList.contains("elegido")){
                met.classList.remove("elegido");
            }
            else{
                if(met.id == "metodo1"){
                    let met2 = document.getElementById("metodo2");
                    met2.classList.remove("elegido")
                }
                else{
                    let met1 = document.getElementById("metodo1");
                    met1.classList.remove("elegido")                                     
                }            
                met.classList.add("elegido");                  

            }
            
        }
    }
}


metodopago();
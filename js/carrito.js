function someFunction21() {
    setTimeout(function () {
    $('#horizontal-stepper').nextStep();
    }, 2000);
}

function seleccionar(){   
    let ul = document.getElementById("steepers-comprar");
    let arrayUl = Array.from(ul.children);
    
    for (let li of arrayUl){
        let indice = arrayUl.indexOf(li);
        let a = li.getElementsByTagName("a")[0];   
        a.onclick = ()=>{
            let secciones = document.getElementById("secciones");
            let arraySecciones  = Array.from(secciones.children);     
            for(let i=indice; i<2;i++){
                arrayUl[indice+i].classList.remove("active");
            }
            if(indice==0){
                arrayUl[2].classList.remove("active");
            }
            
            if(indice== 0  || indice!=0 && arrayUl[indice-1].classList.contains("active")){
                if(indice==2){
                    let secdatos = arraySecciones[1];
                    let opciones1 = secdatos.children[1];
                    let opciones = opciones1.children;
                    if(!opciones[0].classList.contains("elegido") && !opciones[1].classList.contains("elegido")){
                        alert("Escoge un metodo de pago.");
                        return 0;
                    }
                }
                for (let sec of arraySecciones){
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
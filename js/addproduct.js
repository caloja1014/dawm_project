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

seleccionar();*/
function someFunction21() {
    setTimeout(function () {
    $('#horizontal-stepper').nextStep();
    }, 2000);
}

function seleccionar(){
    let ul = document.getElementById("steepers-addproduct");
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
                if(indice==1){
                    //Condiciones para llegar aqui
                }
                if(indice==2){
                    //Condiciones para llegar aqui
                }
                for (let i = 0; i<arraySecciones.length;i++){
                    if(i==indice){
                        arraySecciones[i].style.display = "" ;
                        li.classList.add("active");
                        arraySecciones[i].classList.remove("seccioninactiva")
                    }else{
                        arraySecciones[i].classList.add("seccioninactiva");
                    }
                }
            }
        }
        
    }
    

}

seleccionar();
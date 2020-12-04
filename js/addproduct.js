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
                    let nombre =  document.getElementById("pnombre").value;
                    let categoria = document.getElementById("sel1").value;
                    let precio = document.getElementById("company").value;
                    let descripcion = document.getElementById("Textarea1").value;
                    if(nombre==""||categoria==""||precio==""||descripcion==""){
                        alert("Por favor llene los campos del formulario");
                        return -1;
                    }
                }
                if(indice==2){
                    //Condiciones para llegar aqui
                }
                for (let i = 0; i<arraySecciones.length;i++){
                    if(i==indice){
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

function submitForm(){
    let submit = document.getElementById("submit");
    submit.onclick = ()=>{
        let ul = document.getElementById("steepers-addproduct");
        let arrayUl = Array.from(ul.children);
        arrayUl[1].classList.add("active");

        let nombre =  document.getElementById("pnombre").value;
        let categoria = document.getElementById("sel1").value;
        let precio = document.getElementById("company").value;
        let descripcion = document.getElementById("Textarea1").value;
        if(nombre==""||categoria==""||precio==""||descripcion==""){
            alert("Por favor llene los campos del formulario");
            return -1;
        }

        let secciones = document.getElementById("secciones");
        let arraySecciones  = Array.from(secciones.children);
        arraySecciones[0].classList.add("seccioninactiva");
        arraySecciones[1].classList.remove("seccioninactiva");
    }
}

submitForm();
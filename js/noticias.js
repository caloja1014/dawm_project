document.addEventListener('DOMContentLoaded', function(){
    cargarNoticias();
})

let cargarNoticias = function(){
    fetch('data/noticias.json')
    .then(response => response.json())
    .then(data =>{
        newsContainer = document.getElementById("newsContainer");
        for(let noticia of data.noticias){
            console.log("hey")
            let img = noticia['imagen'];
            let titulo = noticia['Titulo'];
            let descripcion = noticia['Descripcion']
            let redireccion = noticia['Redireccion']
            let fecha = noticia['Fecha']

            let card = crearCard();
            let imageEl = crearImagen(img);
            let cardBody = crearCardBody(titulo, descripcion, redireccion);
            let cardFooter = crearCardFoot(fecha);

            card.appendChild(imageEl);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            newsContainer.appendChild(card);
        }
    })
}


let crearCard=()=>{
    let card = document.createElement('div');
    card.setAttribute('class','card mb-4');
    return card;
}

let crearImagen = (imagen) =>{
    let imageEl = document.createElement('img');
    imageEl.setAttribute('class','card-img-top');
    imageEl.setAttribute('src', imagen);
    return imageEl;
}

let crearCardBody = (titulo, descripcion, redireccion) => {
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");
    let titleEl = crearTitulo(titulo);
    let descEl = crearDescrip(descripcion);
    let button = crearBoton(redireccion);
    cardBody.appendChild(titleEl);
    cardBody.appendChild(descEl);
    cardBody.appendChild(button);
    return cardBody;
}

let crearTitulo = (titulo)=>{
    let titleEl = document.createElement("h2");
    titleEl.setAttribute("class","card-title");
    titleEl.textContent = titulo;
    return titleEl;
}

let crearDescrip = (descripcion)=>{
    let descEl = document.createElement("p");
    descEl.setAttribute("class","card-text");
    descEl.textContent = descripcion;
    return descEl;
}

let crearBoton = (redireccion) => {
    let boton = document.createElement("a");
    boton.setAttribute("class","btn btn-primary");
    boton.setAttribute("href",redireccion);
    boton.textContent = "Read More";
    return boton;
}

let crearCardFoot=(fecha)=>{
    cardFoot = document.createElement("div");
    cardFoot.setAttribute("class","card-footer text-muted"),
    cardFoot.textContent = "Posted: "+fecha;
    return cardFoot;
}
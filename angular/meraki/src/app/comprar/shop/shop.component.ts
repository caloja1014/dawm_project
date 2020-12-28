import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import productos from '../../../assets/Productos.json';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
  constructor() {
  }


  ngOnInit(): void {

    this.addnav();

    this.buscar();
    let carousel = document.getElementById("carousel-products");
    let firstCateg = productos[0];
    let contimg = 0;
    let carouselIndicators = document.getElementsByClassName("carousel-indicators")[0];
    carouselIndicators.innerHTML = "";
    carousel!.innerHTML = "";
    for (let imgCarousel of firstCateg.header.imagenes) {
      let active = contimg++ == 0 ? "active" : "";
      carouselIndicators.innerHTML +=
        `<li data-target="#carouselExampleIndicators" data-slide-to="${contimg - 1}" class="${active}"></li>`;

      carousel!.innerHTML +=
        `<div class="carousel-item ${active}">
          <img class="d-block img-fluid" src="assets/productos/${firstCateg.categoria}/${imgCarousel}" alt="First slide">
          </div>`;
    }


    let categorias = document.getElementById("categorias");
    let divproductos = document.getElementById("productos");
    let cont = 0;
    for (let elemento of productos) {
      let seleccionado = cont++ == 0 ? "categ-seleccionada" : "";
      categorias!.innerHTML += '<a id="' + elemento.categoria + '" class="list-group-item ' + seleccionado + '">' + elemento.categoria + '</a>'
      let divCategoria = document.createElement("div");
      divCategoria.id = "div" + elemento.categoria;
      if (cont > 1) {
        divCategoria.style.display = "none";
      }
      divCategoria.className = "row";
      divproductos!.appendChild(divCategoria);
      for (let producto of elemento.productos) {
        divCategoria.innerHTML +=
          '<div class="col-lg-4 col-md-6 mb-4">' +
          '<div class="card h-100">' +
          '<a href="#"><img class="card-img-top" src="./assets/productos/' + elemento.categoria + '/' + producto.img + '" alt=""></a>' +
          '<div class="card-body">' +
          '<div class="card-top">' +
          '<h4 class="card-title">' +
          '<a href="#">' + producto.nombre + '</a>' +
          '</h4>' +
          '<h5>$' + producto.precio + '</h5>' +
          '<p class="card-text">' + producto.descripcion + '</p>' +
          '</div>' +
          '<a class="button btn-comprar">Comprar</a>'
        '</div>' +
          '</div>' +
          '</div>'
      }
    }
    let divCategoria = document.createElement("div");
    divCategoria.id = "divBusqueda";
    divCategoria.className = "row";
    divCategoria.style.display = "none";
    divproductos!.appendChild(divCategoria);
    this.comprar();
    this.onclicks();

  }

  comprar(): void {
    for (let item of productos) {
      let divcateg = document.getElementById("div" + item.categoria);
      const productosC = divcateg!.children;

      for (let divProducto of productosC) {
        let btnComprar = divProducto.getElementsByClassName("button")[0];
        btnComprar.onclick = () => {
          if (btnComprar.classList.contains("btn-comprado")) {
            btnComprar.classList.remove("btn-comprado");
            btnComprar.innerHTML = "Comprar";
          } else {
            btnComprar.classList.add("btn-comprado");
            btnComprar.innerHTML = "Seleccionado";
          }
        }
      }
    }
  };

  onclicks(): void {
    for (let item of productos) {

      let a = document.getElementById(item.categoria);

      a!.onclick = () => {
        let carousel = document.getElementById("carousel-products");

        let carouselIndicators = document.getElementsByClassName("carousel-indicators")[0];
        carouselIndicators.innerHTML = "";
        carousel!.innerHTML = "";
        let cont = 0
        for (let imgCarousel of item.header.imagenes) {
          let active = cont++ == 0 ? "active" : "";
          carouselIndicators!.innerHTML +=
            `<li data-target="#carouselExampleIndicators" data-slide-to="${cont - 1}" class="${active}"></li>`;

          carousel!.innerHTML +=
            '<div class="carousel-item ' + active + '">' +
            '<img class="d-block img-fluid" src="./assets/productos/' + item.categoria + '/' + imgCarousel + '" alt="First slide">' +
            '</div>';
        }
        let categString = item.categoria;
        let products = document.getElementById("productos");
        for (let item2 of productos) {
          let divcateg = document.getElementById("div" + item2.categoria);
          let itemCateg = document.getElementById(item2.categoria);
          if (item2.categoria != categString) {
            divcateg!.style.display = "none";
            itemCateg!.classList.remove("categ-seleccionada")
          } else {
            divcateg!.style.display = "";
            itemCateg!.classList.add("categ-seleccionada")
          }
        }
      };
    }
  };

  addnav(): void {
    let nav = document.getElementById("mainNav");
    let ul = nav!.getElementsByTagName("ul")[0];
    ul.innerHTML += `<li class="nav-item"><a class="nav-link js-scroll-trigger" 
    routerLink="/app-cart" href="/app-cart"><img id="carrito" 
    src="./assets/icons/carrito-de-compras.png" alt=""></a></li>
    <li class="topbar-divider d-none d-sm-block"></li>
    <li class="nav-item dropdown text-center">
      <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        <span class="mr-2 d-none d-lg-inline cuenta">Cuenta</span>
        <img id="user" alt="Profile Image"
        src="/assets/icons/not-logged.png">
      </a>
      <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown">
        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#loginModal">
          Iniciar Sesión
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#registerModal">
          Registrarse
        </a>
      </div>
    </li>`;
  };

  buscar(): void {
    var buscador = document.getElementById("inputProducto");
    buscador.oninput = () => {
      let value = buscador.value.toUpperCase();
      let categorias = document.getElementById("categorias");
      let catSelect = categorias.getElementsByClassName("categ-seleccionada");

      let divproductos = document.getElementById("productos");
      let divBusqueda = document.getElementById("divBusqueda");
      if (value == "") {
        let idDiv = catSelect[0].id;
        document.getElementById("div" + idDiv).style.display = "";
        divBusqueda.innerHTML = "";
      }
      else {
        let productosRow = divproductos.getElementsByClassName("row");
        for (let p of productosRow) {
          p.style.display = "none"
        }
        divBusqueda.innerHTML = "";
        divBusqueda.style.display = "";
        for (let elemento of productos) {
          for (let producto of elemento.productos) {
            let nombProducto = producto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
            if (nombProducto.includes(value)) {

              divBusqueda.innerHTML +=
                '<div class="col-lg-4 col-md-6 mb-4">' +
                '<div class="card h-100">' +
                '<a href="#"><img class="card-img-top" src=./assets/productos/' + elemento.categoria + '/' + producto.img + ' alt=""></a>' +
                '<div class="card-body">' +
                '<div class="card-top">' +
                '<h4 class="card-title">' +
                '<a href="#">' + producto.nombre + '</a>' +
                '</h4>' +
                '<h5>$' + producto.precio + '</h5>' +
                '<p class="card-text">' + producto.descripcion + '</p>' +
                '</div>' +
                '<a class="button btn-comprar">Comprar</a>'
              '</div>' +
                '</div>' +
                '</div>'
            }


          }
        }
      }

    }
  }


}

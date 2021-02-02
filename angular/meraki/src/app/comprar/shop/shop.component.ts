import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { ProductsService } from 'src/services/products/products.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
    productos: any;
    constructor(
        private _authService: AuthService,
        private _productsService: ProductsService
    ) {
        _authService.setIsCompras(true);
    }

    ngOnInit(): void {
        this._productsService.obtenerProductos().subscribe((productos) => {
            this.productos = productos;
            this.buscar();
            let carousel = document.getElementById('carousel-products');
            let firstCateg = productos[0];
            let contimg = 0;
            let carouselIndicators = document.getElementsByClassName(
                'carousel-indicators'
            )[0];
            carouselIndicators.innerHTML = '';
            carousel!.innerHTML = '';
            for (let imgCarousel of firstCateg.header.imagenes) {
                let active = contimg++ == 0 ? 'active' : '';
                carouselIndicators.innerHTML += `<li data-target="#carouselExampleIndicators" data-slide-to="${
                    contimg - 1
                }" class="${active}"></li>`;

                carousel!.innerHTML += `<div class="carousel-item ${active}">
            <img class="d-block img-fluid" src="${imgCarousel}" alt="First slide">
            </div>`;
            }

            let categorias = document.getElementById('categorias');
            let divproductos = document.getElementById('productos');
            let cont = 0;
            for (let elemento of productos) {
                let seleccionado = cont++ == 0 ? 'categ-seleccionada' : '';
                categorias!.innerHTML +=
                    '<a id="' +
                    elemento.categoria +
                    '" class="list-group-item ' +
                    seleccionado +
                    '">' +
                    elemento.categoria +
                    '</a>';
                let divCategoria = document.createElement('div');
                divCategoria.id = 'div' + elemento.categoria;
                if (cont > 1) {
                    divCategoria.style.display = 'none';
                }
                divCategoria.className = 'row';
                divproductos!.appendChild(divCategoria);
                for (let producto of elemento.productos) {
                    divCategoria.innerHTML +=
                        '<div class="col-lg-4 col-md-6 mb-4">' +
                        '<div class="card h-100">' +
                        '<img class="card-img-top" src="' +
                        producto.img +
                        '" alt="">' +
                        '<div class="card-body">' +
                        '<div class="card-top">' +
                        '<h5 class="card-title text-primary">' +
                        producto.nombre +
                        '</h5>' +
                        '<h5 class="card-price">$' +
                        producto.precio +
                        '</h5>' +
                        '<p class="card-text">' +
                        producto.descripcion +
                        '</p>' +
                        '</div>' +
                        '<a id="comprar-' +
                        producto.id +
                        '" class="button px-3 btn-comprar">Seleccionar</a>';
                    '</div>' + '</div>' + '</div>';
                }
            }
            let divCategoria = document.createElement('div');
            divCategoria.id = 'divBusqueda';
            divCategoria.className = 'row';
            divCategoria.style.display = 'none';
            divproductos!.appendChild(divCategoria);
            this.comprar();
            this.onclicks();
        });
    }

    comprar(): void {
        for (let item of this.productos) {
            let divcateg = document.getElementById('div' + item.categoria);
            const productosC = divcateg!.children;

            for (let divProducto of <any>productosC) {
                let btnComprar = divProducto.getElementsByClassName(
                    'button'
                )[0];
                btnComprar.onclick = this.openModal;
            }
        }
    }

    openModal(event: Event) {
        let aTarget = <HTMLElement>event.target;
        let id = <string>aTarget.id?.split('-')[1];
        let divCardBody = aTarget.parentElement;
        let nomProd = divCardBody?.getElementsByClassName('card-title')[0];
        let precio = divCardBody?.getElementsByClassName('card-price')[0];
        let descripcion = divCardBody?.getElementsByClassName('card-text')[0];
        let divCard = divCardBody?.parentElement;
        let img = divCard?.getElementsByTagName('img')[0];
        let srcImg: any = img?.getAttribute('src');
        (<any>document.getElementById('nombreProdModal')).textContent =
            nomProd?.textContent;
        (<any>document.getElementById('priceModal')).textContent =
            precio?.textContent;
        (<any>document.getElementById('descModal')).textContent =
            descripcion?.textContent;
        (<any>document.getElementById('cantidad')).value = 1;
        let imgModal = document.getElementById('imgModal');
        imgModal?.setAttribute('src', srcImg);
        let addCartBtn = document.getElementById('addCart');
        (<any>document.getElementById('idProduct')).textContent = id;
        document.getElementById('openCartModal')?.click();
    }

    addCart() {
        let idProducto = document.getElementById('idProduct')?.textContent;
        let cantidadInput = <HTMLInputElement>(
            document.getElementById('cantidad')
        );
        let cantidad = cantidadInput.value;
        this._productsService.addCart({ idProducto, cantidad }).subscribe(
            (res) => {
                document.getElementById('closeModalCart')?.click();
            },
            (err) => {
                document.getElementById('closeModalCart')?.click();
                localStorage.removeItem('token');
                document.getElementById('registrarseBtn')?.click();
            }
        );
    }
    onclicks(): void {
        for (let item of this.productos) {
            let a = document.getElementById(item.categoria);

            a!.onclick = () => {
                let carousel = document.getElementById('carousel-products');

                let carouselIndicators = document.getElementsByClassName(
                    'carousel-indicators'
                )[0];
                carouselIndicators.innerHTML = '';
                carousel!.innerHTML = '';
                let cont = 0;
                for (let imgCarousel of item.header.imagenes) {
                    let active = cont++ == 0 ? 'active' : '';
                    carouselIndicators!.innerHTML += `<li data-target="#carouselExampleIndicators" data-slide-to="${
                        cont - 1
                    }" class="${active}"></li>`;

                    carousel!.innerHTML +=
                        '<div class="carousel-item ' +
                        active +
                        '">' +
                        '<img class="d-block img-fluid" src="' +
                        imgCarousel +
                        '" alt="First slide">' +
                        '</div>';
                }
                let categString = item.categoria;
                for (let item2 of this.productos) {
                    let divcateg = document.getElementById(
                        'div' + item2.categoria
                    );
                    let itemCateg = document.getElementById(item2.categoria);
                    if (item2.categoria != categString) {
                        divcateg!.style.display = 'none';
                        itemCateg!.classList.remove('categ-seleccionada');
                    } else {
                        divcateg!.style.display = '';
                        itemCateg!.classList.add('categ-seleccionada');
                    }
                }
            };
        }
    }

    buscar(): void {
        var buscador = document.getElementById(
            'inputProducto'
        ) as HTMLInputElement;
        buscador!.oninput = () => {
            let value = buscador!.value.toUpperCase();
            let categorias = document.getElementById('categorias');
            let catSelect = categorias!.getElementsByClassName(
                'categ-seleccionada'
            );

            let divproductos = document.getElementById('productos');
            let divBusqueda = document.getElementById('divBusqueda');
            if (value == '') {
                let idDiv = catSelect[0].id;
                document.getElementById('div' + idDiv)!.style.display = '';
                divBusqueda!.innerHTML = '';
            } else {
                let productosRow = divproductos!.getElementsByClassName('row');
                for (let p of <any>productosRow) {
                    p.style.display = 'none';
                }
                divBusqueda!.innerHTML = '';
                divBusqueda!.style.display = '';
                for (let elemento of this.productos) {
                    for (let producto of elemento.productos) {
                        let nombProducto = producto.nombre
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toUpperCase();
                        if (nombProducto.includes(value)) {
                            divBusqueda!.innerHTML +=
                                '<div class="col-lg-4 col-md-6 mb-4">' +
                                '<div class="card h-100">' +
                                '<a href="#"><img class="card-img-top" src="' +
                                producto.img +
                                '" alt=""></a>' +
                                '<div class="card-body">' +
                                '<div class="card-top">' +
                                '<h4 class="card-title">' +
                                '<a href="#">' +
                                producto.nombre +
                                '</a>' +
                                '</h4>' +
                                '<h5>$' +
                                producto.precio +
                                '</h5>' +
                                '<p class="card-text">' +
                                producto.descripcion +
                                '</p>' +
                                '</div>' +
                                '<a class="button px-3 btn-comprar">Seleccionar</a>';
                            '</div>' + '</div>' + '</div>';
                        }
                    }
                }
            }
        };
    }
}

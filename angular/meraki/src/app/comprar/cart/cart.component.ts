import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Stepper from 'bs-stepper';
import { AuthService } from 'src/services/auth/auth.service';
import { ProductsService } from 'src/services/products/products.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    private stepper!: Stepper;

    productos: any = [];
    body = { metodoPago: '' };

    productEdit = {
        id: '',
        nombre: '',
        precio: 0,
        descripcion: '',
        imagen: '',
        cantidad: 0,
    };
    constructor(
        private _authService: AuthService,
        private prodServ: ProductsService
    ) {
        _authService.setIsCompras(true);
        this.cargarCarrito();
    }
    next() {
        this.stepper.next();
    }

    cargarCarrito() {
        this.prodServ.obtenerCarrito().subscribe((res) => {
            this.productos = res;
        });
    }

    onSubmit() {
        return false;
    }

    metodopago() {
        let metodos = document.getElementById('metodos');
        for (let met of <any>metodos!.children) {
            met.onclick = () => {
                if (met.classList.contains('elegido')) {
                    met.classList.remove('elegido');
                    this.body.metodoPago = '';
                } else {
                    if (met.id == 'metodo1') {
                        let met2 = document.getElementById('metodo2');
                        met2!.classList.remove('elegido');
                        this.body.metodoPago = 'Efectivo';
                        console.log(this.body.metodoPago);
                    } else {
                        this.body.metodoPago = 'Tranferencia Bancaria';
                        console.log(this.body.metodoPago);
                        let met1 = document.getElementById('metodo1');
                        met1!.classList.remove('elegido');
                    }
                    met.classList.add('elegido');
                }
            };
        }
    }

    eliminardelCarrito(id: any) {
        this.prodServ.borrarDelCarrito(id).subscribe();
        this.cargarCarrito();
    }

    realizarCompra(): void {
        if (this.body.metodoPago == '')
            alert('Por favor selecciona un método de pago');
        else {
            this.prodServ.RealizarCompra(this.body).subscribe(
                (res) => {
                    this.next();
                },
                (err) => {
                    alert('No se pudo realizar la compra');
                }
            );
        }
    }

    ngOnInit() {
        let stepper = document.querySelector('#stepper1');
        if (stepper != null) {
            this.stepper = new Stepper(stepper, {
                linear: true,
                animation: true,
            });
        }

        this.metodopago();
    }

    openEditModal(producto: any) {
        console.log(producto);
        this.productEdit.id = producto.id;
        this.productEdit.cantidad = producto.cantidad;
        this.productEdit.nombre = producto.nombre;
        this.productEdit.precio = producto.precio;
        this.productEdit.imagen = producto.imagen;
        this.productEdit.descripcion = producto.descripcion;

        let editarBtn = <HTMLElement>document.getElementById('addCart');
        editarBtn.onclick = (e) => {
            if(this.productEdit.cantidad<1){
                return alert("No se admiten cantidades negativas");
            }
            this.prodServ
                .editarCantidadProdCart({
                    id: this.productEdit.id,
                    cantidad: this.productEdit.cantidad,
                })
                .subscribe(
                    (res) => {
                        this.cargarCarrito();
                        document.getElementById('closeModalCart')?.click();
                    },
                    (err) => {
                        alert(
                            'Ha ocurrido un error al querer actualizar la cantidad de su producto.'
                        );
                    }
                );
        };
        document.getElementById('editBtn')?.click();
    }
}

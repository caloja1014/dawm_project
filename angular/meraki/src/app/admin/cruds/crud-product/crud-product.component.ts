import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products/products.service';

@Component({
    selector: 'app-crud-product',
    templateUrl: './crud-product.component.html',
    styleUrls: ['../../sb-admin-2.css', './crud-product.component.css'],
})
export class CrudProductComponent implements OnInit {
    productos: Array<any> = [];
    poductoEdit = {
        nombre: '',
        descripcion: '',
        precio: 0,
    };
    constructor(private _productService: ProductsService) {
        this.cargarProductos();
    }

    cargarProductos() {
        this._productService.obtenerProductos().subscribe((err) => {
            this.productos = err;
        });
    }
    ngOnInit(): void {}

    editarProducto(producto: any) {
        this.poductoEdit.nombre = producto.nombre;
        this.poductoEdit.descripcion = producto.descripcion;
        this.poductoEdit.precio = producto.precio;
        let btnEdit = <HTMLElement>document.getElementById('btnEditar');
        btnEdit.onclick = () => {
            this._productService
                .editarProducto({
                    id: producto.id,
                    nombre: this.poductoEdit.nombre,
                    descripcion: this.poductoEdit.descripcion,
                    precio: this.poductoEdit.precio,
                })
                .subscribe((res) => {
                    document.getElementById('btnCloseEdit')?.click();
                    this.cargarProductos();
                });
        };
        document.getElementById('editBtn')?.click();
    }

    eliminaProducto(id: any) {
        this._productService.eliminarProducto(id).subscribe((res) => {
            this.cargarProductos();
        });
    }
}

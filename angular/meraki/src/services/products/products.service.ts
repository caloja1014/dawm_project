import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private productopost = 'http://localhost:3000/admin/addProduct';
    private productoput = 'http://localhost:3000/admin/editProduct';
    private productodelete = 'http://localhost:3000/admin/deleteProduct';
    private photoPost = 'http://localhost:3000/admin/addPhotop';
    private addCartPost = 'http://localhost:3000/cart/add';
    private getCarrito = 'http://localhost:3000/cart/prods';
    private getProductos = 'http://localhost:3000/prod/all';
    private deletefromcart = 'http://localhost:3000/cart/';
    private editCant = 'http://localhost:3000/cart/edit';
    private realizarCompra = 'http://localhost:3000/comprar';
    constructor(private http: HttpClient) {}

    addCart(body: any) {
        return this.http.post<any>(this.addCartPost, body);
    }

    crearProducto(producto: any) {
        return this.http.post<any>(this.productopost, producto);
    }

    subirFoto(data: any) {
        return this.http.post<any>(this.photoPost, data);
    }

    obtenerCarrito() {
        return this.http.get<any>(this.getCarrito);
    }

    obtenerProductos() {
        return this.http.get<any>(this.getProductos);
    }

    editarProducto(body: any) {
        return this.http.put<any>(this.productoput, body);
    }

    eliminarProducto(id: any) {
        return this.http.delete<any>(this.productodelete + '/' + id);
    }

    editarCantidadProdCart(body: any) {
        return this.http.put<any>(this.editCant, body);
    }

    borrarDelCarrito(id: string) {
        return this.http.delete<any>(this.deletefromcart + id);
    }

    RealizarCompra(compra: any) {
        return this.http.post<any>(this.realizarCompra, compra);
    }
}

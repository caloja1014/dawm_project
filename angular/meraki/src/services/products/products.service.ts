import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productopost = 'http://localhost:3000/admin/addProduct';
  private photoPost =    'http://localhost:3000/admin/addPhotop';
  private getCarrito = 'http://localhost:3000/cart/prods';
  private deletefromcart = 'http://localhost:3000/cart/';

  constructor(private http: HttpClient) { 
  }

  crearProducto(producto:any){
    return this.http.post<any>(this.productopost, producto);
  }

  subirFoto(data:any){
    return this.http.post<any>(this.photoPost, data);
  }

  obtenerCarrito(){
    return this.http.get<any>(this.getCarrito);
  }

  borrarDelCarrito(id:any){
    return this.http.delete<any>(this.deletefromcart+id);
  }


  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private host = 'http://localhost:3000/admin';
    constructor(private http: HttpClient) {}

    login(body: any) {
        return this.http.post<any>(this.host + '/login', body);
    }

    addProduct(producto: any) {
        return this.http.post<any>(this.host + '/addProduct', producto);
    }

    addNew(noticia: any) {
        return this.http.post<any>(this.host + '/addNew', noticia);
    }

    addCateg(categ: any) {
        return this.http.post<any>(this.host + '/addCateg', categ);
    }

    getVentasSemanales(body: any) {
        return this.http.post<any>(this.host + '/ventaSemanal', body);
    }

    getVentasAnuales(categoria: string) {
        return this.http.get<any>(this.host + '/ventaCateg/' + categoria);
    }

    getVentasCategorias() {
        return this.http.get<any>(this.host + '/pie');
    }
}

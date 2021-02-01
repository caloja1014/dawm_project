import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private host = 'http://localhost:3000/admin';
    constructor(private http: HttpClient, private _router: Router) {}

    login(body: any) {
        return this.http.post<any>(this.host + '/login', body);
    }

    logoutUser() {
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
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

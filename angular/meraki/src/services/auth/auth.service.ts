import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _registerUrl = 'http://localhost:3000/register';
    private _loginUrl = 'http://localhost:3000/login';
    private _profile = 'http://localhost:3000/profile';
    private _direcciones = 'http://localhost:3000/address';

    private isCompras = false;

    constructor(private http: HttpClient, private _router: Router) {}

    registerUser(user: any) {
        return this.http.post<any>(this._registerUrl, user);
    }

    loginUser(user: any) {
        return this.http.post<any>(this._loginUrl, user);
    }

    loggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getIsCompras() {
        return this.isCompras;
    }

    setIsCompras(isCompras: boolean) {
        this.isCompras = isCompras;
    }

    logoutUser() {
        localStorage.removeItem('token');
        this._router.navigate(['/shop']);
    }

    getProfile() {
        return this.http.get<any>(this._profile);
    }

    getDirecciones() {
        return this.http.get<any>(this._direcciones);
    }

    addDireccion(body: any) {
        return this.http.post<any>(this._direcciones, body);
    }

    changeDireccion(body: any) {
        return this.http.put<any>(this._direcciones, body);
    }

    deleteDireccion(id: any) {
        return this.http.delete<any>(this._direcciones + '/' + id);
    }
}

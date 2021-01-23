import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _registerUrl = 'http://localhost:3000/register';
    private _loginUrl = 'http://localhost:3000/login';

    private isCompras = false;

    constructor(private http: HttpClient) {}

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
}

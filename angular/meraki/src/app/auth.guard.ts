import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}
    canActivate(): boolean {
        if (this._authService.loggedIn()) {
            return true;
        }
        if (this._router.url == '/shop') {
            const divModal = document.getElementById('loginModal');
            const divError = divModal?.getElementsByClassName('error')[0];
            divError!.innerHTML = `
            <div class="alert alert-danger alert-dismisable fade show position-relative">
                Inicia sesión primero.
                <button type="button" class="close login-close" data-dismiss="alert" aria-label="close">
                    <span aria-hidden="true"> &times; </span>
                </button>
            </div>
        `;
            document.getElementById('iniciarSesionBtn')?.click();
        } else {
            this._router.navigate(['/shop']).then(() => {
                document.addEventListener('DOMContentLoaded', () => {
                    document.getElementById('iniciarSesionBtn')?.click();
                });
            });
        }
        return false;
    }
}

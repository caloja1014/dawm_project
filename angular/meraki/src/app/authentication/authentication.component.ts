import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
    registerUserData = {
        email: '',
        password: '',
        password_confirmation: '',
    };
    loginUserData = {
        email: '',
        password: '',
    };
    constructor(private _auth: AuthService, private _router: Router) {}

    ngOnInit(): void {}

    registerUser() {
        if (
            this.registerUserData.email == '' ||
            this.registerUserData.password == '' ||
            this.registerUserData.password_confirmation == ''
        ) {
            this.informError(
                'registerModal',
                'Por favor, llene todos los campos'
            );
            return;
        }

        if (this.registerUserData.email.split('@').length != 2) {
            this.informError('registerModal', 'Ingrese un email válido');
            return;
        }
        if (this.registerUserData.password.length < 6) {
            this.informError(
                'registerModal',
                'La contraseña debe tener al menos 6 caracteres'
            );
            return;
        }
        if (
            this.registerUserData.password !=
            this.registerUserData.password_confirmation
        ) {
            this.informError('registerModal', 'Las contraseñas no coinciden');
            return;
        }
        this._auth.registerUser(this.registerUserData).subscribe(
            (res) => {
                localStorage.setItem('token', res.token);
                document.getElementById('closeRegister')?.click();
                this._router.navigate(['/profile']);
            },
            (err) => {
                this.informError('registerModal', 'Ha ocurrido un error');
            }
        );
    }

    loginUser() {
        this._auth.loginUser(this.loginUserData).subscribe(
            (res) => {
                localStorage.setItem('token', res.token);
                document.getElementById('closeLogin')?.click();
                this._router.navigate(['/profile']);
            },
            (err) => {
                this.informError('loginModal', 'Ha ocurrido un error');
            }
        );
    }

    informError(modal: string, error: string): void {
        const divModal = document.getElementById(modal);
        const modalDialog = divModal?.getElementsByClassName('modal-dialog')[0];
        modalDialog?.classList.add('shake');
        setTimeout(() => {
            modalDialog?.classList.remove('shake');
        }, 500);
        const divError = divModal?.getElementsByClassName('error')[0];
        divError!.innerHTML = `
            <div class="alert alert-danger alert-dismisable fade show position-relative">
                ${error}
                <button type="button" 
                    class="close login-close" data-dismiss="alert" aria-label="close">
                        <span aria-hidden="true"> &times; </span>
                </button>
            </div>
        `;
    }

    verifyEnter(event: any, id: string) {
        if (event.keyCode == 13) {
            document.getElementById(id)?.click();
        }
    }
}

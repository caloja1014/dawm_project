import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../sb-admin-2.css', './login.component.css'],
})
export class LoginComponent implements OnInit {
    loginAdminData = {
        username: '',
        password: '',
    };
    constructor(private _adminService: AdminService, private _router: Router) {}

    ngOnInit(): void {}

    entrar() {
        let errorEl: any = document.getElementById('errorLogin')!;
        /*if (
            this.loginAdminData.user == 'admin' &&
            this.loginAdminData.pass == 'admin'
        ) {
            errorEl.style.display = 'none';
            this._router.navigate(['/controlpanel']);
        } else {
            this.loginAdminData.user = '';
            this.loginAdminData.pass = '';
            errorEl.style.display = 'block';
        }*/

        this._adminService.login(this.loginAdminData).subscribe(
            (res) => {
                localStorage.setItem('token', res.token);
                this._router.navigate(['/controlpanel']);
            },
            (err) => {
                this.loginAdminData.username = '';
                this.loginAdminData.password = '';
                errorEl.style.display = 'block';
            }
        );
    }

    verifyEnter(event: any) {
        if (event.keyCode == 13) {
            document.getElementById('btnIniciar')?.click();
        }
    }
}

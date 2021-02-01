import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    data = {
        nombres: 'Alex',
        apellidos: 'Velez',
        email: 'velezllaquealex@gmail.com',
    };
    constructor(private _authService: AuthService) {
        _authService.setIsCompras(true);
    }
    ngOnInit(): void {
        this._authService.getProfile().subscribe((res) => {
            console.log(res);
        });
    }

    mostrarProfile(numero: number): void {
        const secciones: any = document.getElementById('profile-container')!
            .children;
        let i = 1;
        for (let seccion of secciones) {
            if (i == numero) {
                seccion.classList.remove('d-none');
            } else {
                seccion.classList.add('d-none');
            }
            i++;
        }

        const divUserMenu = document.getElementsByClassName(
            'profile-usermenu'
        )[0];
        const ulUserMenu = divUserMenu.children[0];
        const lis = ulUserMenu.children;
        for (let i = 1; i <= 4; i++) {
            if (i == numero) {
                lis[i - 1].classList.add('active');
            } else {
                lis[i - 1].classList.remove('active');
            }
        }
    }
}

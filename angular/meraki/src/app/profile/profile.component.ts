import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    data = {
        nombres: '-',
        apellidos: '-',
        email: '-',
        username: '-',
        celular: '-',
    };

    direcciones = [
        {
            id: 1,
            direccion: 'aaaa',
        },
    ];
    constructor(private _authService: AuthService, private _router: Router) {
        _authService.setIsCompras(true);
        _authService.getDirecciones().subscribe((dir) => {
            this.direcciones = dir;
            console.log(dir);
        });
    }
    ngOnInit(): void {
        this._authService.getProfile().subscribe((res) => {
            console.log(res);
            this.data.nombres = res.nombres ?? '-';
            this.data.apellidos = res.apellidos ?? '-';
            this.data.username = res.username ?? '-';
            this.data.email = res.email;
            this.data.celular = res.celular ?? '-';
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

    editDireccion(event: Event) {
        let target: HTMLElement = <any>event.currentTarget;
        let idDiv = target.id;
        let iDireccion = idDiv.split('-')[2];
        let idDireccion = idDiv.split('-')[3];
        let inputDireccion: any = document.getElementById(
            'direccion-' + iDireccion
        );
        let modal = document.getElementById('editAddrModal');
        (<any>(
            modal?.getElementsByClassName('direccionInput')[0]
        )).textContent = iDireccion;
        (<any>(
            modal?.getElementsByClassName('changeDireccion')[0]
        )).value = this.direcciones[parseInt(iDireccion) - 1].direccion;
        let btnEditar: any = modal?.getElementsByClassName('btnEditar');
        btnEditar.addEventListener('click', (event: Event) => {
            let nuevaDireccion: any = modal?.getElementsByClassName(
                'changeDireccion'
            );
            nuevaDireccion = nuevaDireccion.value;
            this._authService
                .changeDireccion({
                    id: idDireccion,
                    direccion: nuevaDireccion,
                })
                .subscribe((res) => {});
        });
        document.getElementById('editBtn')?.click();
    }

    addDireccion() {
        let inputDireccion: any = document.getElementById('newDireccion');
        inputDireccion = inputDireccion.value;
        this._authService
            .addDireccion({ direccion: inputDireccion })
            .subscribe();
    }
}

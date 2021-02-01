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

    dataEdit = {
        nombres: '',
        apellidos: '',
        username: '',
        celular: '',
        newpass: '',
        newpassConfirm: '',
    };

    direcciones: Array<any> = [];
    constructor(private _authService: AuthService, private _router: Router) {
        _authService.setIsCompras(true);
        _authService.getDirecciones().subscribe((dir) => {
            this.direcciones = dir;
        });
        this.cargarProfile();
    }
    ngOnInit(): void {}

    cargarProfile() {
        this._authService.getProfile().subscribe((res) => {
            console.log(res);
            this.data.nombres = res.nombres ?? '-';
            this.data.apellidos = res.apellidos ?? '-';
            this.data.username = res.username ?? '-';
            this.data.email = res.email;
            this.data.celular = res.celular ?? '-';
            this.dataEdit.nombres = res.nombres ?? '';
            this.dataEdit.apellidos = res.apellidos ?? '';
            this.dataEdit.username = res.username ?? '';
            this.dataEdit.celular = res.celular ?? '';
            this.dataEdit.newpass = '';
            this.dataEdit.newpassConfirm = '';
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
        let modal = document.getElementById('editAddrModal');
        (<any>(
            modal?.getElementsByClassName('direccionInput')[0]
        )).textContent = iDireccion;
        (<any>(
            modal?.getElementsByClassName('changeDireccion')[0]
        )).value = this.direcciones[parseInt(iDireccion) - 1].descripcion;
        let btnEditar: any = modal?.getElementsByClassName('btnEditar')[0];
        btnEditar.addEventListener('click', (event: Event) => {
            let nuevaDireccion: any = modal?.getElementsByClassName(
                'changeDireccion'
            )[0];
            nuevaDireccion = nuevaDireccion.value;
            this._authService
                .changeDireccion({
                    id: idDireccion,
                    direccion: nuevaDireccion,
                })
                .subscribe((res) => {
                    this._authService.getDirecciones().subscribe((dir) => {
                        this.direcciones = dir;
                        document.getElementById('btnCloseEdit')?.click();
                    });
                });
        });
        document.getElementById('editBtn')?.click();
    }

    addDireccion() {
        let inputDireccion: any = document.getElementById('newDireccion');
        let stringinputDireccion = inputDireccion.value;
        this._authService
            .addDireccion({ direccion: stringinputDireccion })
            .subscribe((res) => {
                this._authService.getDirecciones().subscribe((dir) => {
                    this.direcciones = dir;
                    document.getElementById('btnCloseAdd')?.click();
                });
            });
    }

    deleteDireccion(event: Event) {
        let target: HTMLElement = <any>event.currentTarget;
        let idDiv = target.id;
        let idDireccion = idDiv.split('-')[3];
        this._authService.deleteDireccion(idDireccion).subscribe((res) => {
            this._authService.getDirecciones().subscribe((dir) => {
                this.direcciones = dir;
            });
        });
    }

    actualizarPerfil() {
        if (!this.validarPassword()) {
            return;
        }
        let newpass: any = document.getElementById('newpass');
        newpass = newpass.value;
        let body = {
            username: this.dataEdit.username,
            newpass,
            name: this.dataEdit.nombres,
            lastname: this.dataEdit.apellidos,
            cell: this.dataEdit.celular,
        };
        this._authService.changeProfile(body).subscribe(
            (res) => {
                this.cargarProfile();
                alert('Sus datos se han cambiado exitosamente!');
            },
            (err) => {
                alert('Ya existe un usuario con ese username');
            }
        );
    }

    validarPassword() {
        console.log(this.dataEdit.newpass == '');
        if (this.dataEdit.newpass == '' && this.dataEdit.newpassConfirm == '') {
            return true;
        }
        if (this.dataEdit.newpass != this.dataEdit.newpassConfirm) {
            alert('Las contraseñas no coinciden');
            return false;
        }
        if (this.dataEdit.newpass.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        return true;
    }
}

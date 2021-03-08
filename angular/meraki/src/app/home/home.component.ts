import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

const CARRUSEL = [
    {
        path: '../../assets/img/productos/banner_2.PNG',
        title: '¡Mira nuestros regalos personalizados!',
        subtitle: 'Para quien mas quieras',
        active: 'active',
        pos: 'First',
    },
    
    {
        path: '../../assets/img/productos/banner.png',
        title: '¡Llegó la navidad!',
        subtitle: 'Mira nuestra variedad de artículos navideños',
        active: '',
        pos: 'Second',
    },
    {
        path: '../../assets/img/productos/banner_regalos.png',
        title: '¡Regalos personalizados!',
        subtitle: 'Para todos tus seres queridos',
        active: '',
        pos: 'Third',
    },
    {
        path: '../../assets/img/productos/chompas.png',
        title: '¡Mira nuestros abrigos más bonitos!',
        subtitle: 'En esta época de frío',
        active: '',
        pos: 'Fourth',
    },
];
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    carrusel = CARRUSEL;

    constructor(private _authService: AuthService) {
        _authService.setIsCompras(false);
    }

    ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
    selector: 'app-dev',
    templateUrl: './dev.component.html',
    styleUrls: ['./dev.component.css'],
})
export class DevComponent implements OnInit {
    constructor(private _authService: AuthService) {
        _authService.setIsCompras(false);
    }
    ngOnInit(): void {}
}

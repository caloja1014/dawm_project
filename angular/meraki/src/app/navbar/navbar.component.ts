import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    username: any;
    constructor(public _authService: AuthService) {}

    ngOnInit() {
        if (this._authService.loggedIn()) {
            this._authService.getProfile().subscribe(
                (res) => {
                    this.username = res.username;
                },
                (err) => {
                    this._authService.logoutUser();
                }
            );
        }
    }
}

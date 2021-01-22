import { Component, OnInit } from '@angular/core';

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
    constructor() {}

    ngOnInit(): void {}

    registerUser() {
        console.log(this.registerUserData);
    }
    loginUser() {
        console.log(this.loginUserData);
    }
}

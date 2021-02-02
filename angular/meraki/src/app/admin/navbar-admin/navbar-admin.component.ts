import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['../sb-admin-2.css', './navbar-admin.component.css'],
})
export class NavbarAdminComponent implements OnInit {
    nomAdmin = '';
    constructor(private _adminService: AdminService, private _router: Router) {
        _adminService.getUsername().subscribe(
            (res) => {
                this.nomAdmin = res.username;
            },
            (err) => {
                _router.navigate(['/login']);
            }
        );
    }
    ngOnInit(): void {}
}

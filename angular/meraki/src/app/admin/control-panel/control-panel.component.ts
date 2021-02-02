import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['../sb-admin-2.css', './control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';
import { CategService } from 'src/services/categories/categ.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['../sb-admin-2.css', './reports.component.css'],
})
export class ReportsComponent implements OnInit {
    categorias: Array<any> = [];
    ventasMensuales: Array<any> = [];
    meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];
    constructor(
        private _adminService: AdminService,
        private _categService: CategService,
        private _router: Router
    ) {
        _categService.obtenerCategorias().subscribe(
            (res) => {
                this.categorias = res;
                if (res.length != 0) {
                    _adminService
                        .getVentasAnuales(res[0])
                        .subscribe((response) => {
                            this.ventasMensuales = response;
                        });
                }
            },
            (err) => {
                _router.navigate(['/login']);
            }
        );
    }

    ngOnInit(): void {}

    cambiarCategoria() {
        let selectCateg = <HTMLInputElement>(
            document.getElementById('categoria')
        );
        let categ = selectCateg.value;
        this._adminService.getVentasAnuales(categ).subscribe((response) => {
            this.ventasMensuales = response;
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { CategService } from 'src/services/categories/categ.service';

@Component({
    selector: 'app-crud-categoria',
    templateUrl: './crud-categoria.component.html',
    styleUrls: ['../../sb-admin-2.css', './crud-categoria.component.css'],
})
export class CrudCategoriaComponent implements OnInit {
    categorias: Array<any> = [];
    categEdit = {
        nombre: '',
        descripcion: '',
    };
    constructor(private _categService: CategService) {
        this.cargarCategorias();
    }

    cargarCategorias() {
        this._categService.getCategories().subscribe((err) => {
            this.categorias = err;
            console.log(err);
        });
    }
    ngOnInit(): void {}

    editarCategoria(categ: any) {
        this.categEdit.nombre = categ.nombre;
        this.categEdit.descripcion = categ.descripcion;
        let btnEdit = <HTMLElement>document.getElementById('btnEditar');
        btnEdit.onclick = () => {
            this._categService
                .editarCateg({
                    id: categ.id,
                    nombre: this.categEdit.nombre,
                    descripcion: this.categEdit.descripcion,
                })
                .subscribe((res) => {
                    document.getElementById('btnCloseEdit')?.click();
                    this.cargarCategorias();
                });
        };
        document.getElementById('editBtn')?.click();
    }

    eliminaCategoria(id: any) {
        this._categService.eliminarCateg(id).subscribe(
            (res) => {
                this.cargarCategorias();
            },
            (err) => {
                alert(
                    'Error al borrar la categoría, asegúrese de que no haya ningún producto en esta categoría.'
                );
            }
        );
    }
}

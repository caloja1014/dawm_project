import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class CategService {
    private categPost = 'http://localhost:3000/admin/addCateg';
    private categPhoto = 'http://localhost:3000/admin/addPhotoCateg';
    private categput = 'http://localhost:3000/admin/editCateg';
    private categdelete = 'http://localhost:3000/admin/deleteCateg';
    private getAllCateg = 'http://localhost:3000/admin/allCateg';
    private getCateg = 'http://localhost:3000/categ';

    constructor(private http: HttpClient) {}

    crearCategoria(categoria: any) {
        return this.http.post<any>(this.categPost, categoria);
    }

    subirFoto(data: any) {
        return this.http.post<any>(this.categPhoto, data);
    }

    obtenerCategorias() {
        return this.http.get<any>(this.getCateg);
    }

    getCategories() {
        return this.http.get<any>(this.getAllCateg);
    }

    editarCateg(body: any) {
        return this.http.put<any>(this.categput, body);
    }

    eliminarCateg(id: any) {
        return this.http.delete<any>(this.categdelete + '/' + id);
    }
}

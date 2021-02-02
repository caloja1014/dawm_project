import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategService {
  private categPost = 'http://localhost:3000/admin/addCateg';
  private categPhoto = 'http://localhost:3000/admin/addPhotoCateg';

  constructor(private http: HttpClient) { }

  crearCategoria(categoria:any){
    return this.http.post<any>(this.categPost, categoria);
  }

  subirFoto(data:any){
    return this.http.post<any>(this.categPhoto, data);
  }
}

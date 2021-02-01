import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private noticias = 'http://localhost:3000/news';

  
  private noticiaspost = 'http://localhost:3000/admin/addNew';
  private photoPost =    'http://localhost:3000/admin/addPhoto';
  constructor(private http: HttpClient) {}

  recibirNoticias() {
      return this.http.get<any>(this.noticias);
  }

  crearNoticia(noticia:any){
    return this.http.post<any>(this.noticiaspost, noticia);
  }

  subirFoto(data:any){
    return this.http.post<any>(this.photoPost, data);
  }
 
}

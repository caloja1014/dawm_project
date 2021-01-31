import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private noticias = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  recibirNoticias() {
      return this.http.get<any>(this.noticias);
  }

  crearNoticia(noticia:any){
    return this.http.post<any>(this.noticias, noticia);
  }
 
}

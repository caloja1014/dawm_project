import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private urlEmail = 'http://localhost:3000/enviarEmail';
  constructor(private http: HttpClient) { }
  enviarEmail(email: any){
    return this.http.post<any>(this.urlEmail,email);
  }
}

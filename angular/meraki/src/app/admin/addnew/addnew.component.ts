import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/services/news/news.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['../sb-admin-2.css','./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  bodyNew = {
    titulo: '',
    descripcion: '',
    imagen: ''
  };

  crearNoticia(): void{
    this.serv.crearNoticia(this.bodyNew);
    console.log(this.bodyNew);
  }
  constructor(private serv: NewsService) { }

  ngOnInit(): void {
  }

}

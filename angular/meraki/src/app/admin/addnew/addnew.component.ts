import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/services/news/news.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['../sb-admin-2.css', './addnew.component.css'],
  providers: [DatePipe]
})
export class AddnewComponent implements OnInit {
  fechatemp = new Date()
  bodyNew = {
    titulo: '',
    descripcion: '',
    imagen: '',
    fecha: this.fechatemp.setHours(this.fechatemp.getHours() - 5)
  };


  file = "";
  saveEvent(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  upload() {
    const formdata = new FormData();
    formdata.append('file', this.file);

    this.serv.subirFoto(formdata).subscribe(
      (res) => {
        alert("Foto agregada con exito");
      },
      (err) => {        
        console.log(err);
      }
    );

  }

  crearNoticia(): void {

    this.bodyNew.imagen = "http://localhost:3000/assets/img/noticias/" + this.bodyNew.imagen.split("\\")[2];
    this.serv.crearNoticia(this.bodyNew).subscribe(
      (res) => {
        alert("Noticia agregada con exito");
        console.log(document.getElementById("ptitulo")!.innerHTML);
        document.getElementById("Textarea1")!.innerHTML = "";
      },
      (err) => {
        alert("Hubo un error. No se pudo agregar la noticia");
        console.log(err);
      }
    );
    this.upload();
    console.log(this.bodyNew);
  }
  constructor(private serv: NewsService, private datePipe: DatePipe, private httpc: HttpClient) {
  }

  ngOnInit(): void {
  }

}




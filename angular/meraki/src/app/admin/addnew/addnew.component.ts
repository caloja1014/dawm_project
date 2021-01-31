import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/services/news/news.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['../sb-admin-2.css','./addnew.component.css'],
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
  
  crearNoticia(): void{
    this.bodyNew.imagen = "assets/productos/camisetas/avengers.jpg";
    const reader = new FileReader();
   
    this.serv.crearNoticia(this.bodyNew).subscribe(
      (res) => {
          alert("Noticia agregada con exito");        
          console.log(document.getElementById("ptitulo")!.innerHTML);
          document.getElementById("Textarea1")!.innerHTML="";          
      },
      (err) => {
        alert("Hubo un error. No se pudo agregar el producto");
         console.log(err);
      }
  );
    console.log(this.bodyNew);
  }
  constructor(private serv: NewsService, private datePipe: DatePipe) { 
  }

  ngOnInit(): void {
  }

}



   
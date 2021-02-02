import { Component, OnInit } from '@angular/core';
import { CategService } from 'src/services/categories/categ.service';

@Component({
  selector: 'app-addcateg',
  templateUrl: './addcateg.component.html',
  styleUrls: ['../sb-admin-2.css', './addcateg.component.css']
})
export class AddcategComponent implements OnInit {

  constructor(private serv: CategService) { }

  categBody = {
    admin: '',
    imagenes: '',
    nombre: '',
    descripcion: ''
  };

  file = '';
  saveEvent(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    const formdata = new FormData();
    formdata.append('file', this.file);

    this.serv.subirFoto(formdata).subscribe();
  }
  crearCategoria(): void {
    let nombre: any = document.getElementById('input-img-categ');
    this.categBody.imagenes =
      'http://localhost:3000/assets/img/categorias/' +
      nombre.value.split('\\')[2];

    this.serv.crearCategoria(this.categBody).subscribe(
      (res) => {
        this.upload()
        alert('Categoria agregada con exito');
      },
      (err) => {
        alert('Hubo un error. No se pudo agregar la categoria');
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

}

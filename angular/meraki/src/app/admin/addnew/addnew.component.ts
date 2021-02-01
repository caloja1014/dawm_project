import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/services/news/news.service';

@Component({
    selector: 'app-addnew',
    templateUrl: './addnew.component.html',
    styleUrls: ['../sb-admin-2.css', './addnew.component.css'],
    providers: [],
})
export class AddnewComponent implements OnInit {
    fechatemp = new Date();
    bodyNew = {
        titulo: '',
        descripcion: '',
        imagen: '',
        fecha: this.fechatemp.setHours(this.fechatemp.getHours() - 5),
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

    crearNoticia(): void {
        let nombre: any = document.getElementById('ControlFile2');
        this.bodyNew.imagen =
            'http://localhost:3000/assets/img/noticias/' +
            nombre.value.split('\\')[2];

        this.serv.crearNoticia(this.bodyNew).subscribe(
            (res) => {
                alert('Noticia agregada con exito');
            },
            (err) => {
                alert('Hubo un error. No se pudo agregar la noticia');
                console.log(err);
            }
        );
        this.upload();
    }
    constructor(
        private serv: NewsService        
    ) {}

    ngOnInit(): void {}
}

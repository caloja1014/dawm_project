import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/services/news/news.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})


export class NoticiasComponent implements OnInit {

  noticias: any = [];
  buscador: any = document.getElementById("inputNoticia")!;
  cards: any = document.getElementsByClassName("card mb-4")!;
  title = document.getElementsByClassName("card-title")!;
  hideme: any = {};

  filtrar(event: any) {

    var input = event.target.value.toLowerCase();

    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].style.display = "";
      let titulo = (this.title[i].textContent)!.toLowerCase();
      if (!titulo.includes(input)) {
        console.log(this.cards[i].textContent)
        this.cards[i].style.display = "none";
      }
    }
  }

  constructor(private serv: NewsService) {
    this.cargarNoticias();
  }
  cargarNoticias() {
    this.serv.recibirNoticias().subscribe(
      (res) => {
        console.log(res);
        this.noticias = res;
      },
      (err) => { console.log(err) }
    );
  } 

  ngOnInit(): void {

  }

}

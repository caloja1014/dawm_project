import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})


export class NoticiasComponent implements OnInit {

  noticias:any= [];
  buscador:any = document.getElementById("inputNoticia")!;
  cards:any = document.getElementsByClassName("card mb-4")!;
  title = document.getElementsByClassName("card-title")!;
  hideme:any = {};

  filtrar(event:any){

    var input = event.target.value.toLowerCase();
   
      for (let i = 0; i<this.cards.length; i++){
          this.cards[i].style.display = "";
          let titulo = (this.title[i].textContent)!.toLowerCase();
          if(!titulo.includes(input)){
              console.log(this.cards[i].textContent)
              this.cards[i].style.display = "none";
          }
      }
  }

  constructor() { 
    fetch("/assets/json/noticias.json")
    .then(resultado => {
      return resultado.json()
    })
    .then(obj => {
      (this.noticias = obj);
    })
    .catch(err => console.log(err));
  }

  ngOnInit(): void {
  }

}

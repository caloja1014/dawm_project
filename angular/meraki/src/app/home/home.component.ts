import { Component, OnInit } from '@angular/core';

const CARRUSEL = [{
  path: "../../assets/img/productos/chompas.png",
  title: "¡Mira nuestros abrigos más bonitos!",
  subtitle: "En esta época de frío",
  active:"active",
  pos:"First",
},
{
  path: "../../assets/img/productos/banner.png",
  title: "¡Llegó la navidad!",
  subtitle: "Mira nuestra variedad de artículos navideños",
  active:"",
  pos:"Second",
},
{
  path: "../../assets/img/productos/banner_regalos.png",
  title: "¡Regalos personalizados!",
  subtitle: "Para todos tus seres queridos",
  active:"",
  pos:"Third",
}
];
const CATEGORIAS=[{
  path:"../../assets/img/categorias/navidad.jpg",
  cat:"Navidad",
},
{
  path:"../../assets/img/categorias/camisetas.jpg",
  cat:"Camisetas",
},
{
  path:"../../assets/img/categorias/textiles.jpg",
  cat:"Suéteres",
},
{
  path:"../../assets/img/categorias/Regalos.jpg",
  cat:"Regalos",
},
{
  path:"../../assets/img/categorias/jarros.jpg",
  cat:"Jarros",
},
{
  path:"../../assets/img/categorias/otros.jpg",
  cat:"Otros",
}
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  carrusel=CARRUSEL;
  cateogrias=CATEGORIAS;
  constructor() { }

  ngOnInit(): void {
  }

}

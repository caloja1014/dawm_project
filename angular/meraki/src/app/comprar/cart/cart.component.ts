import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {

  name = 'Angular';
  private stepper!: Stepper;

  productos:any;

  constructor(){
    this.productos  = [
      {
        "categoria":"otros",
        "nombre": "Portavelas",
        "descripcion": "Porta velas de madera más tres velitas led a pilas, incluye cajita de regalo. Lindo detalle",
        "precio": 4,
        "img": "portavelas.jpg"
      },
      {
        "categoria":"otros",
        "nombre": "Tapetes navieños",
        "descripcion": "Tapetes navideños tejidos a mano",
        "precio": 5,
        "img": "tapetesNavidenos.jpg"
      },
      {
        "categoria":"otros",
        "nombre": "Colgante de cumpleaños",
        "descripcion": "Ahora será fácil recordar los cumpleaños de tu familia con este lindo colgante. Incluye caja",
        "precio": 10,
        "img": "colganteCumpleanos.jpg"
      }
    ];
  }
  next() {
    console.log(this.stepper);
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  metodopago(){
    let metodos = document.getElementById("metodos");
    for(let met of metodos!.children){
        met.onclick = ()=>{     
            if(met.classList.contains("elegido")){
                met.classList.remove("elegido");
            }
            else{
                if(met.id == "metodo1"){
                    let met2 = document.getElementById("metodo2");
                    met2!.classList.remove("elegido")
                }
                else{
                    let met1 = document.getElementById("metodo1");
                    met1!.classList.remove("elegido")                                     
                }            
                met.classList.add("elegido");                  
            }
            
        }
    }
}


addnav(): void {
  let nav = document.getElementById("mainNav");
  let ul = nav!.getElementsByTagName("ul")[0];
  ul.innerHTML += `
  <li class="nav-item dropdown text-center">
    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">
      <span class="mr-2 d-none d-lg-inline cuenta">Cuenta</span>
      <img id="user" alt="Profile Image"
      src="/assets/icons/not-logged.png">
    </a>
    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
      aria-labelledby="userDropdown">
      <a class="dropdown-item" href="#" data-toggle="modal" data-target="#loginModal">
        Iniciar Sesión
      </a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#" data-toggle="modal" data-target="#registerModal">
        Registrarse
      </a>
    </div>
  </li>`;
};

  ngOnInit() {
    this.addnav();
    let stepper = document.querySelector('#stepper1');
    if (stepper != null) {
      this.stepper = new Stepper(stepper, {
        linear: false,
        animation: true,
      });
      //this.stepper.
    }

    this.metodopago();
  }

}

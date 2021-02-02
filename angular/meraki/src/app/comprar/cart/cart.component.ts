import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Stepper from 'bs-stepper';
import { AuthService } from 'src/services/auth/auth.service';
import { ProductsService } from 'src/services/products/products.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    private stepper!: Stepper;

    productos: any = [];

    constructor(private _authService: AuthService,private prodServ: ProductsService) {
        _authService.setIsCompras(true);
        this.cargarCarrito();        
    }
    next() {
        console.log(this.stepper);
        this.stepper.next();
    }

    cargarCarrito() {
        this.prodServ.obtenerCarrito().subscribe(
          (res) => { 
            console.log(res);
            this.productos = res;
          },
          (err) => { console.log(err) }
        );
      } 

     

    onSubmit() {
        return false;
    }

    metodopago() {
        let metodos = document.getElementById('metodos');
        for (let met of <any>metodos!.children) {
            met.onclick = () => {
                if (met.classList.contains('elegido')) {
                    met.classList.remove('elegido');
                } else {
                    if (met.id == 'metodo1') {
                        let met2 = document.getElementById('metodo2');
                        met2!.classList.remove('elegido');
                    } else {
                        let met1 = document.getElementById('metodo1');
                        met1!.classList.remove('elegido');
                    }
                    met.classList.add('elegido');
                }
            };
        }
    }

    addnav(): void {
        let nav = document.getElementById('mainNav');
        let ul = nav!.getElementsByTagName('ul')[0];
    }

    ngOnInit() {
        this.addnav();
        let stepper = document.querySelector('#stepper1');
        if (stepper != null) {
            this.stepper = new Stepper(stepper, {
                linear: true,
                animation: true,
            });
        }

        this.metodopago();
    }
}

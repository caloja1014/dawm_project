import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { CategService } from 'src/services/categories/categ.service';
import { ProductsService } from 'src/services/products/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['../sb-admin-2.css', './addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  categorias: any = [];
  private stepper!: Stepper;
  productBody = {
    nombre : '',
    descripcion:'',
    costoBase : '',
    imagen : '',
    estaDisponible:'1',
    categoria : ''
  }

  file = '';
  cargarCategorias() {
    this.catServ.obtenerCategorias().subscribe(
      (res) => {
        console.log(res);
        this.categorias = res;
      },
      (err) => { console.log(err) }
    );
  } 
    saveEvent(event: any) {
        this.file = event.target.files[0];
    }

    upload() {
        const formdata = new FormData();
        formdata.append('file', this.file);

        this.serv.subirFoto(formdata).subscribe();
    }

  next() {
    console.log(this.stepper);
    this.stepper.next();
  }
  crearProducto(): void {  
    let nombre: any = document.getElementById('inputFileProduct');
        this.productBody.imagen =
            'http://localhost:3000/assets/img/productos/' +
            nombre.value.split('\\')[2]; 
    this.serv.crearProducto(this.productBody).subscribe(
        (res) => {
          this.next();          
        },
        (err) => {
            alert('Hubo un error. No se pudo agregar el producto.');
            console.log(err);
        }
    );
    this.upload();
}
  constructor(private serv: ProductsService, private catServ :CategService ) {
    this.cargarCategorias();
   }

  ngOnInit(): void {
    let stepper = document.querySelector('#stepper1');
    if (stepper != null) {
      this.stepper = new Stepper(stepper, {
        linear: true,
        animation: true,
      });
    }
  }

}

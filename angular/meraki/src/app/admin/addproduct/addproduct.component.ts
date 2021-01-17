import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['../sb-admin-2.css','./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  private stepper!: Stepper;

  next() {
    console.log(this.stepper);
    this.stepper.next();
    
  }

  constructor() { 
    

  }

  ngOnInit(): void {
    let stepper = document.getElementById('stepper1');
    this.stepper = new Stepper(stepper!, {
      linear: true,
      animation: true,
    });
    
  }

}

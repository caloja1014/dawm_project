import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  private stepper!: Stepper;

  next() {
    console.log(this.stepper);
    this.stepper.next();
  }

  constructor() { }

  ngOnInit(): void {
    let stepper = document.querySelector('#stepper1');
    if (stepper != null) {
      this.stepper = new Stepper(stepper, {
        linear: false,
        animation: true,
      });
    }
  }

}

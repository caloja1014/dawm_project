import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { EmailService } from 'src/services/email/email.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  bodyEmail = {
    name: '',
    email: '',
    telf: '',
    origin: '',
    msg: ''
  };

  enviarEmail(): void{
    this.serv.enviarEmail(this.bodyEmail);
    console.log(this.bodyEmail);
  }
  constructor(private serv: EmailService,private _authService: AuthService) {
    _authService.setIsCompras(false);
  }

  ngOnInit(): void {
  }

}

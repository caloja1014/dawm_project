import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../sb-admin-2.css','./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  entrar(){
    let userEl: any = document.getElementById("username")!;
    let user = userEl.value;
    let passEl: any = document.getElementById('password')!;
    let pass = passEl.value
    let errorEl:any = document.getElementById("errorLogin")!;
    if(user == "admin" && pass=="admin"){
        errorEl.style.display="none";
        window.open("/controlpanel","_self")
    }else{
        userEl.value="";
        passEl.value="";
        errorEl.style.display="block";
    }
  }

}

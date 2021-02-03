import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { EmailService } from 'src/services/email/email.service';

@Component({
    selector: 'app-contactanos',
    templateUrl: './contactanos.component.html',
    styleUrls: ['./contactanos.component.css'],
})
export class ContactanosComponent implements OnInit {
    bodyEmail = {
        name: '',
        email: '',
        telf: '',
        origin: '',
        msg: '',
    };

    enviarEmail(): void {
        let nom = <HTMLInputElement>document.getElementById('nombre-Contact');
        let email = <HTMLInputElement>document.getElementById('email-Contact');
        let phone = <HTMLInputElement>document.getElementById('phone-Contact');
        let text = <HTMLInputElement>document.getElementById('text-Contact');
        if (
            nom.value == '' ||
            email.value == '' ||
            phone.value == '' ||
            text.value == ''
        ) {
            return alert('Por favor rellene todos los campos.');
        }
        document.body.classList.add('waiting');
        this.serv.enviarEmail(this.bodyEmail).subscribe(
            (res) => {
                document.body.classList.remove('waiting');
                alert('Su correo ha sido enviado');

                nom.value = '';
                email.value = '';
                phone.value = '';
                text.value = '';
            },
            (err) => {
                console.log(err);
            }
        );
        console.log(this.bodyEmail);
    }
    constructor(private serv: EmailService, private _authService: AuthService) {
        _authService.setIsCompras(false);
    }

    ngOnInit(): void {}
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { DevComponent } from './dev/dev.component';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { ShopComponent } from './comprar/shop/shop.component';
import { CartComponent } from './comprar/cart/cart.component';
import { AdminModule } from './admin/admin.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from './auth.guard';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        AboutComponent,
        DevComponent,
        HomeComponent,
        NoticiasComponent,
        ContactanosComponent,
        ShopComponent,
        CartComponent,
        AuthenticationComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        AdminModule,
    ],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}

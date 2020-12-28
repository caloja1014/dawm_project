import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { ShopComponent } from './comprar/shop/shop.component';
import { CartComponent } from './comprar/cart/cart.component';

@NgModule({
  declarations: [		
    AppComponent,
      NavbarComponent,
      FooterComponent,
      ContactanosComponent,
      ShopComponent,
      CartComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

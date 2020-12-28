import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import {Routes, RouterModule} from '@angular/router';
const rutas:Routes=[{path:"about",component:AboutComponent}]
@NgModule({
  declarations: [			
    AppComponent,
      NavbarComponent,
      FooterComponent,
      AboutComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterModule.forRoot(rutas),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

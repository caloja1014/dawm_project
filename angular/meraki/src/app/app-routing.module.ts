import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasComponent } from './noticias/noticias.component';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { CartComponent } from './comprar/cart/cart.component';
import { ShopComponent } from './comprar/shop/shop.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { LoginComponent } from './admin/login/login.component';

const routes: Routes = [{path:"shop", component: ShopComponent},
{path:"cart", component:CartComponent},
{path:"contactus",component:ContactanosComponent},
{path:"adminCPanel",component:ControlPanelComponent},
{path:'noticias', component: NoticiasComponent},
{path:'login',component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
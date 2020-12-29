import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasComponent } from './noticias/noticias.component';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { CartComponent } from './comprar/cart/cart.component';
import { ShopComponent } from './comprar/shop/shop.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { AddnewComponent } from './admin/addnew/addnew.component';
import { AddcategComponent } from './admin/addcateg/addcateg.component';

const routes: Routes = [{path:"shop", component: ShopComponent},
{path:"cart", component:CartComponent},
{path:"contactus",component:ContactanosComponent},
{path:"controlpanel",component:ControlPanelComponent},
{path:'noticias', component: NoticiasComponent},
{path:"addnew",component: AddnewComponent},
{path:"addcateg",component: AddcategComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
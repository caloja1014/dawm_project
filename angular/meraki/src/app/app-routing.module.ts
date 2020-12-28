import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { CartComponent } from './comprar/cart/cart.component';
import { ShopComponent } from './comprar/shop/shop.component';
import { ContactanosComponent } from './contactanos/contactanos.component';

const routes: Routes = [{path:"shop", component: ShopComponent},
{path:"cart", component:CartComponent},
{path:"contactus",component:ContactanosComponent},
{path:"adminCPanel",component:ControlPanelComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
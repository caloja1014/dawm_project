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
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DevComponent } from './dev/dev.component';
import { LoginComponent } from './admin/login/login.component';
import { EstadisticasComponent } from './admin/estadisticas/estadisticas.component';

const routes: Routes = [{ path: "shop", component: ShopComponent },
{ path: "cart", component: CartComponent },
{ path: "contactus", component: ContactanosComponent },
{ path: "controlpanel", component: ControlPanelComponent },
{ path: 'noticias', component: NoticiasComponent },
{ path: "addnew", component: AddnewComponent },
{ path: "addcateg", component: AddcategComponent },
{ path: "", component: HomeComponent }, 
{ path: "about", component: AboutComponent }, 
{ path: "dev", component: DevComponent },
{path:'login',component: LoginComponent},
{path:"adminEstadisticas",component:EstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
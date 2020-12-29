import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { AdminComponent } from './admin.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { LoginComponent } from './login/login.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AddnewComponent } from './addnew/addnew.component';
import { AddcategComponent } from './addcateg/addcateg.component';



@NgModule({
  declarations: [AsideComponent, AdminComponent, ControlPanelComponent, LoginComponent, EstadisticasComponent, NavbarAdminComponent, AddnewComponent, AddcategComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }

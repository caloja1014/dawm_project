import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { AdminComponent } from './admin.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AppModule } from '../app.module';
import { LoginComponent } from './login/login.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';



@NgModule({
  declarations: [AsideComponent, AdminComponent, ControlPanelComponent, LoginComponent, EstadisticasComponent, NavbarAdminComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }

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
import { AddproductComponent } from './addproduct/addproduct.component';
import { FormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AsideComponent,
        AdminComponent,
        ControlPanelComponent,
        LoginComponent,
        EstadisticasComponent,
        NavbarAdminComponent,
        AddnewComponent,
        AddcategComponent,
        AddproductComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AngularFileUploaderModule,
    ],
})
export class AdminModule {}

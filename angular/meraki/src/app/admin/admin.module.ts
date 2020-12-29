import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { AdminComponent } from './admin.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AppModule } from '../app.module';
import { AddnewComponent } from './addnew/addnew.component';
import { AddcategComponent } from './addcateg/addcateg.component';
import { AddproductComponent } from './addproduct/addproduct.component';



@NgModule({
  declarations: [AsideComponent, AdminComponent, ControlPanelComponent, AddnewComponent, AddcategComponent, AddproductComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }

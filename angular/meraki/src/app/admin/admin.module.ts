import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { AdminComponent } from './admin.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [AsideComponent, AdminComponent, ControlPanelComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }

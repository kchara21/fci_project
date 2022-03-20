import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { UtilsService } from '../../service/utils.service';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,MaterialModule,RouterModule
  ],
  exports:[
    SidebarComponent
  ],
  providers:[UtilsService]
})
export class SidebarModule { }

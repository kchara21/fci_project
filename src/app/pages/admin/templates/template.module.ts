import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '@app/material.module';
import { TemplateRoutingModule } from './template-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TemplateComponent } from './template.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminInterceptor } from '@app/shared/interceptors/admin-interceptor';
import { ModalTemplateComponent } from '../components/modal-template/modal-template.component';



@NgModule({
  declarations: [TemplateComponent, ModalTemplateComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule ,
    MatDialogModule,
    MatSelectModule,
    FormsModule
  ]
  
  
})
export class TemplateModule { }

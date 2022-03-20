import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../components/modal/modal.component';
import { MaterialModule } from '@app/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [
     ModalComponent,UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule ,
    MatDialogModule,
    MatSelectModule
   
  ]
})
export class UsersModule { }

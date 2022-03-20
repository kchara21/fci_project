import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../../../material.module';
import { ParametersComponent } from './parameters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ParametersComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
  
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule ,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    
  
  ]
})
export class ParametersModule { }

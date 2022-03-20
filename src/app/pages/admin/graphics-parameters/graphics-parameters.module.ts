import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicsParametersComponent } from './graphics-parameters.component';
import { NgChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule ,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    
    
   
  ]
})
export class GraphicsParametersModule { }

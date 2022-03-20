import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../../material.module';
import { UsersModule } from './users/users.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphicsParametersModule } from './graphics-parameters/graphics-parameters.module';
import { ModalParameterComponent } from './components/modal-parameter/modal-parameter.component';
import { ParametersModule } from './parameters/parameters.module';
import { GraphicsParametersComponent } from './graphics-parameters/graphics-parameters.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { PoolsComponent } from './pools/pools.component';
import { ModalPoolComponent } from './components/modal-pool/modal-pool.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { TemplateModule } from './templates/template.module';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ModalTimeCensusComponent } from './components/modal-time-census/modal-time-census.component';



@NgModule({
  declarations: [
    AdminComponent,
    ModalParameterComponent,
    GraphicsParametersComponent,
    PoolsComponent,
    ModalPoolComponent,
    GraphicComponent,
    ModalTimeCensusComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgChartsModule,
    
    
    GraphicsParametersModule,
    
    UsersModule,
    TemplateModule,
    ParametersModule,

   

    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule
    
  
    
  ],
 
})
export class AdminModule { }

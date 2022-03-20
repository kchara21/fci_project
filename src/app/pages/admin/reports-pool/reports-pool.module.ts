import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ReportsPoolComponent } from './reports-pool.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [ReportsPoolComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatDatepickerModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule ,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    NgChartsModule
  ]
})
export class ReportsPoolModule { }

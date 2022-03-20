import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class AuthModule { }

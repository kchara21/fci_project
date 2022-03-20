import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseFormUser } from '@shared/utils/base-form-user';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private _subscription:Subscription = new Subscription();



  constructor(private _authService:AuthService, private _fb:FormBuilder, private _router:Router, public _loginForm:BaseFormUser ) { }
  
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this._loginForm.baseForm.get('rol').setValidators(null);
    this._loginForm.baseForm.get('rol').updateValueAndValidity();

    this._loginForm.baseForm.get('nombre').setValidators(null);
    this._loginForm.baseForm.get('nombre').updateValueAndValidity();
  }

  checkField(field:string):boolean{
    return this._loginForm.isValidField(field);
  }

  onLogin():void{
    if(this._loginForm.baseForm.invalid){
    
      return;
      
    }
    const formValue = this._loginForm.baseForm.value;
    this._subscription.add(
      this._authService.login(formValue)
        .subscribe(res=>{
          if(res){
            this._router.navigate(['/admin']);
          }
        },
        (err:any)=>{
       
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
        }
        )
        
    );

  }

  
 

}

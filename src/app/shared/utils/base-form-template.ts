import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';



@Injectable({providedIn:'root'})
export class BaseFormTemplate{


    private _isNumber = /^([0-9])*$/;

    errorMessage = null;
    constructor(private fb:FormBuilder){}

    baseForm = this.fb.group({
        codigo:['',[Validators.required,Validators.minLength(6)]],
        nombre:['',[Validators.required,Validators.minLength(2)]],
        valor_maximo:['',[Validators.required,Validators.pattern(this._isNumber)]],
        valor_minimo:['',[Validators.required,Validators.pattern(this._isNumber)]]
    })


    isValidField(field:string):boolean{
        this.getErrorMessage(field);
      return(
      this.baseForm.get(field)?.touched || this.baseForm.get(field)?.dirty)! &&
     (!this.baseForm.get(field)?.valid)
    }


    private getErrorMessage(field:string):void{

        const {errors} = this.baseForm.get(field)!;
        if(errors){
            const minLength = errors?.['minlength']?.requiredLength;
            
            const messages = {
                required:'Campo requerido',
                pattern:'Debe ingresar un numero',
                minLength:`Debe tener minimo ${minLength} caracteres`,
            };
            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

      }




}
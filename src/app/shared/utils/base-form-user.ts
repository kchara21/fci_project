import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';


@Injectable({providedIn:'root'})
export class BaseFormUser{


    errorMessage = null;
    constructor(private fb:FormBuilder){}


    baseForm = this.fb.group({
        nombre:['',[Validators.required,Validators.minLength(6)]],
        email:['',[Validators.required,Validators.email]],
        clave:['',[Validators.required,Validators.minLength(6)]],
        rol:['',[Validators.required]],
        piscinas:[''],

      });


     
    
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
                required:'Debe ingresar un valor',
                pattern:'No es un email valido',
                minLength:`Debe tener minimo ${minLength} caracteres`,
            };
            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

      }

}
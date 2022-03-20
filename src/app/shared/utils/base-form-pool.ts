import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';



@Injectable({providedIn:'root'})
export class BaseFormPool{
    patchValue(arg0: { nombre: any; email: any; rol: any; }) {
      throw new Error('Method not implemented.');
    }


 
    errorMessage = null;
    constructor(private fb:FormBuilder){}
    

    baseForm = this.fb.group({
        codigo:['',[Validators.required,Validators.minLength(6)]],
        camaronera:['',[Validators.required,Validators.minLength(4)]],
        responsable:['',[Validators.required,Validators.minLength(4)]],
    
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
                minLength:`Debe tener minimo ${minLength} caracteres`,
            };
            const errorKey = Object.keys(errors).find(Boolean);
            this.errorMessage = messages[errorKey];
        }

      }




  


}
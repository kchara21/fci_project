import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { UserService } from '../../services/user.service';
import { PoolService } from '../../services/pool.service';
import Swal from 'sweetalert2';


enum Action{
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  selected = [];
  
  piscinasDisponibles = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public userForm:BaseFormUser, private userSvc:UserService, private poolSvc:PoolService) {
    
   }

   



   llamarPiscinaPorUsuario



  ngOnInit(): void {




    this.llamarPiscinas();
    if(this.data?.user.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT; 
      this.pathFormData();
      this.showPasswordField = false;
      this.data.title = 'Editar Usuario';
      this.userForm.baseForm.get('clave').setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();      
    }else{ 

     
      
      this.userForm.baseForm.markAsUntouched()
      this.userForm.baseForm.get('nombre').setValue(null);
      this.userForm.baseForm.get('clave').setValue(null);
      this.userForm.baseForm.get('email').setValue(null);
      this.userForm.baseForm.get('rol').setValue(null);
      this.userForm.baseForm.get('piscinas').setValue(null);
      this.userForm.baseForm.updateValueAndValidity();

    }
  }


  llamarPiscinas():void{
    

    this.poolSvc.getAll()
    .subscribe(res=>{
      this.piscinasDisponibles = res;

      res.forEach(pool => {
        pool.usuarios.forEach(usuario => {
          if(usuario.id === this.data?.user?.id){
            this.selected.push(pool.id)
          }
        });
        
      });



    })

   


  }

  onSave():void{
 
    const formValue = this.userForm.baseForm.value;
    if(this.actionTODO === Action.NEW){
      this.userSvc.new(formValue)
        .subscribe((res:any)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message ,
            showConfirmButton: false,
            timer: 1500
          })
          
            
        },(err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
        })
    }else{
      const userId = this.data?.user?.id;
      this.userSvc.update(userId,formValue)
        .subscribe((res:any)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message ,
            showConfirmButton: false,
            timer: 1000
          })
       
        },(err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
        })
    }
  }


  checkField(field:string):boolean{
    return this.userForm.isValidField(field);
  }

  private pathFormData():void{
    this.userForm.baseForm.patchValue({
      nombre:this.data?.user?.nombre,
      email:this.data?.user?.email,
      rol:this.data?.user?.rol,
      piscinas:this.data?.user?.piscinas,
    })
  }




}

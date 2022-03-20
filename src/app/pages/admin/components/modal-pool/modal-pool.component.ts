import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormPool } from '@shared/utils/base-form-pool';
import { PoolService } from '../../services/pool.service';
import Swal from 'sweetalert2';

enum Action{
  EDIT = 'edit',
  NEW = 'new'
}


@Component({
  selector: 'app-modal-pool',
  templateUrl: './modal-pool.component.html',
  styleUrls: ['./modal-pool.component.css']
})
export class ModalPoolComponent implements OnInit {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;


  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public poolForm:BaseFormPool, private poolSvc:PoolService) { }
  

  ngOnInit(): void {
 
    if(this.data?.pool.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT; 
      this.pathFormData();
      this.data.title = 'Editar Piscina'
    }else{
      this.poolForm.baseForm.markAsUntouched()
      this.poolForm.baseForm.get('codigo').setValue(null);  
      this.poolForm.baseForm.get('camaronera').setValue(null);
      this.poolForm.baseForm.get('responsable').setValue(null);
      this.poolForm.baseForm.updateValueAndValidity();

    }
  }

  onSave():void{
 
    const formValue = this.poolForm.baseForm.value;
    if(this.actionTODO === Action.NEW){
      this.poolSvc.new(formValue)
        .subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Piscina Creada',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }else{
      const poolId = this.data?.pool?.id;
      this.poolSvc.update(poolId,formValue)
        .subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1000
          })
        })
    }
  }



  
  checkField(field:string):boolean{
    return this.poolForm.isValidField(field);
  }


  private pathFormData():void{
    this.poolForm.baseForm.patchValue({
      codigo:this.data?.pool?.codigo,
      camaronera:this.data?.pool?.camaronera,
      responsable:this.data?.pool?.responsable
    })
  }




}

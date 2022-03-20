import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParameterService } from '../../services/parameter.service';
import { BaseFormParameter } from '../../../../shared/utils/base-form-parameter';
import { TemplateService } from '../../services/template.service';
import { PoolService } from '../../services/pool.service';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
enum Action{
  EDIT = 'edit',
  NEW = 'new'
}



@Component({
  selector: 'app-modal-parameter',
  templateUrl: './modal-parameter.component.html',
  styleUrls: ['./modal-parameter.component.css']
})
export class ModalParameterComponent implements OnInit {

  
  actionTODO = Action.NEW;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private paramSvc:ParameterService, private templateSvc:TemplateService,  private poolService:PoolService, public paramForm:BaseFormParameter, private apiSvc:ApiService) { }
  plantillasDisponibles = [];
  piscinasDisponibles = [];
  nombreParametrosApi = [];

  ngOnInit(): void {
 
    this.llamarPlantillas();
    this.llamarPiscinas();
    this.llamarNombres();
    if(this.data?.parameter.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT;
      this.data.title = 'Editar Parametro'
      this.pathFormData();

      
     
    }else{
      
      this.paramForm.baseForm.markAsUntouched()
      this.paramForm.baseForm.get('nombre').setValue(null);
      this.paramForm.baseForm.get('codigo').setValue(null);
      this.paramForm.baseForm.get('plantilla').setValue(null);
      this.paramForm.baseForm.get('piscina').setValue(null);
      this.paramForm.baseForm.updateValueAndValidity();

    }
  }

  onChange():void{

  }

  llamarNombres():void{
    this.apiSvc.getAll()
    .subscribe(res=>{
        this.nombreParametrosApi = Object.keys(res);
        
    })
  }


   llamarPlantillas():void{
    this.templateSvc.getAll()
    .subscribe(res=>{
      res.forEach(template=>{
       this.plantillasDisponibles.push(template);
  
      })
    })

   }

   llamarPiscinas():void{
    this.poolService.getAll()
    .subscribe(res=>{
      res.forEach(template=>{
       this.piscinasDisponibles.push(template);
      })
    })

   }


   onSaveTemplate():void{
    
    const formValue = this.paramForm.baseForm.value;
    if(this.actionTODO === Action.NEW){
      this.paramSvc.new(formValue)
        .subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }else{
      const parameterId = this.data?.parameter?.id;
      this.paramSvc.update(parameterId,formValue)
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


  private pathFormData():void{
    this.paramForm.baseForm.patchValue({
      codigo:this.data?.parameter?.codigo,
      nombre:this.data?.parameter?.nombre,
      plantilla:this.data?.parameter?.plantilla?.id,
      piscina:this.data?.parameter?.piscina?.id
    })
  }





  checkField(field:string):boolean{
    return this.paramForm.isValidField(field);
  }




}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateService } from '../../services/template.service';
import { BaseFormTemplate } from '../../../../shared/utils/base-form-template';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

enum Action{
  EDIT = 'edit',
  NEW = 'new'
}



@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.css']
})
export class ModalTemplateComponent implements OnInit {

  actionTODO = Action.NEW;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private apiSvc:ApiService, private templateSvc:TemplateService, public templateForm:BaseFormTemplate) { }
  
  nombreParametrosApi = []

 


  ngOnInit(): void {
    this.llamarNombres();
  
    if(this.data?.template.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT; 
      this.pathFormData();
      
      this.data.title = 'Editar Plantilla'
    }else{
      this.templateForm.baseForm.markAsUntouched()
      this.templateForm.baseForm.get('nombre').setValue(null);
      this.templateForm.baseForm.get('codigo').setValue(null);
      this.templateForm.baseForm.get('valor_maximo').setValue(null);
      this.templateForm.baseForm.get('valor_minimo').setValue(null);
      this.templateForm.baseForm.updateValueAndValidity();
    }
  }

  
  llamarNombres():void{
    this.apiSvc.getAll()
    .subscribe(res=>{
        this.nombreParametrosApi = Object.keys(res);
       
    })
  }


  onSaveTemplate():void{

    const formValue = this.templateForm.baseForm.value;
    if(this.actionTODO === Action.NEW){
      this.templateSvc.new(formValue)
        .subscribe((res:any)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }else{
      const templateId = this.data?.template?.id;
      this.templateSvc.update(templateId,formValue)
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
    return this.templateForm.isValidField(field);
  }


  private pathFormData():void{
    this.templateForm.baseForm.patchValue({
      codigo:this.data?.template?.codigo,
      nombre:this.data?.template?.nombre,
      parametros:this.data?.template?.parametros,
      valor_maximo:this.data?.template?.valor_maximo,
      valor_minimo:this.data?.template?.valor_minimo,
    })

    
  }







}

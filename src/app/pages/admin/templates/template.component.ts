import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { TemplateService } from '@admin/admin/services/template.service';
import { ModalTemplateComponent } from '@admin/admin/components/modal-template/modal-template.component';
import Swal from 'sweetalert2';
import { ParameterService } from '../services/parameter.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements AfterViewInit, OnInit {



  displayedColumns: string[] = ['id', 'nombre','codigo', 'verParametros', 'valor_maximo','valor_minimo', 'acciones'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();

  selectedParam = null;
  parametrosApi = [];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private templateSvc:TemplateService, private _dialog:MatDialog, private apiSvc:ApiService) { }


  loadTemplates():void{
    this.templateSvc.getAll()
    .subscribe(templates=>{
        this.dataSource.data = templates;
    })
  }

  loadParamsApi():void{
    
    this.apiSvc.getAll()
   
    .subscribe((res)=>{
      let params = Object.keys(res);
    
      this.parametrosApi.push(params);
      this.parametrosApi[0].push("TODOS")
    })
    

 
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.loadTemplates();
    this.loadParamsApi();
  }

  filterParam(): void {

    if (this.selectedParam === "TODOS") {
      this.loadTemplates();
     
    } else {
      this.templateSvc.getByName(this.selectedParam)
        .subscribe((res) => {
          this.dataSource.data = res;
      
        })
        
    }

  }
  
 

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
  }


  onDeleteTemplate(templateId:number):void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir el cambio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.templateSvc.delete(templateId)
        .pipe(takeUntil(this.destroy$))
          .subscribe(res=>{
            Swal.fire(
              '¡Eliminado!',
              res?.['message'],
              'success'
            )
            this.loadTemplates();
          })
      }

    })
      
    
   
  }

  onOpenModalTemplate(template={}):void{
   
      this._dialog.open(ModalTemplateComponent,
      {
        height:'400px',
        width:'600px',
        data:{title:'Nuevo Parametro',template}
      })
      .afterClosed().subscribe(res=>{
        this.loadTemplates();
      })
  }




}

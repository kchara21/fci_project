import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ParameterService } from '../services/parameter.service';
import { PoolService } from '../services/pool.service';
import * as moment from 'moment';
import { ApiService } from '../services/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { GraphicComponent } from '../components/graphic/graphic.component';
import { MatDialog } from '@angular/material/dialog';
import { ValueService } from '../services/value.service';



@Component({
  selector: 'app-reports-pool',
  templateUrl: './reports-pool.component.html',
  styleUrls: ['./reports-pool.component.css']
})
export class ReportsPoolComponent implements OnInit {

  displayedColumns: string[] = ['id', 'parametro', 'valor', 'estado', 'responsable','createdAt', 'valor_minimo', 'valor_maximo'];
  dataSource = new MatTableDataSource();
  filtroParam: FormGroup
  selectedParam = null;
  private destroy$ = new Subject<any>();
  piscinasDisponibles = [];
  parametrosApi = [];
  moment: any = moment;
  letParamGrafic;


  date;


  @ViewChild(MatSort) sort!: MatSort;


  constructor(private fb: FormBuilder, private valueSvc: ValueService,  private poolService:PoolService, private apiSvc:ApiService, private _dialog:MatDialog) {
    this.filtroParam = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      piscina:['',Validators.required],
      selectedParam:['',Validators.required]
    });

  }



  llamarParametrosApi():void{
    
    this.apiSvc.getAll()
   
    .subscribe((res)=>{
      let params = Object.keys(res);
      this.parametrosApi.push(params);
      this.parametrosApi[0].push("TODOS")
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

  

  ngOnInit(): void {
    this.llamarPiscinas();
    this.llamarParametrosApi();
  }

 

  filtrosParam(): void {
   
     this.date = this.filtroParam.value;
    const { end, selectedParam,start,piscina} = this.date; 
    

    
    this.valueSvc.getReportById(piscina, selectedParam, start, end)
      .subscribe(values => {
        this.dataSource.data = values.valParPool; 
      })
  }


  onOpenModal(filtroParam={}):void{
   
    this._dialog.open(GraphicComponent,
    {
      height:'600px',
      width:'800px',
      data:{title:'Nuevo usuario',filtroParam}
    })
}

}

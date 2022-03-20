import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ParameterService } from '@admin/admin/services/parameter.service';
import { ModalParameterComponent } from '@admin/admin/components/modal-parameter/modal-parameter.component';
import Swal from 'sweetalert2';
import { PoolService } from '../services/pool.service';


@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit, AfterViewInit, OnDestroy {


  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'plantilla', 'piscina', 'acciones'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort!: MatSort;

 
  piscinas = [];
  selectedPool = null;


  constructor(
    private poolService: PoolService, private parameterSvc: ParameterService, 
    private _dialog: MatDialog) { }



  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }




  getPiscinas(): void {
    this.poolService.getAll()
      .subscribe((res) => {

        res.forEach((pool) => {
          this.piscinas.push(pool.codigo)
        })
        this.piscinas.push("TODOS")

      })
  }



  filterParamByPool(): void {

    if (this.selectedPool === "TODOS") {
      this.loadParameters();
    } else {
      this.parameterSvc.getByPool(this.selectedPool)
        .subscribe((res) => {
          this.dataSource.data = res;
        },
        (err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })

        })
    }

  }


  loadParameters(): void {
    this.parameterSvc.getAll()
      .subscribe(parameters => {
        this.dataSource.data = parameters;

      })
  }


  ngOnInit(): void {
    this.loadParameters();
    this.getPiscinas()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }




  onDeleteParam(paramId: number): void {
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

        this.parameterSvc.delete(paramId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            Swal.fire(
              '¡Eliminado!',
              res?.['message'],
              'success'
            )
            this.loadParameters();
          }

          )
      }

    })


  }

  onOpenModalParameter(parameter = {}): void {

    this._dialog.open(ModalParameterComponent,
      {
        height: '400px',
        width: '600px',
        data: { title: 'Nuevo Parametro', parameter }
      })
      .afterClosed().subscribe(res => {
        this.loadParameters();
      })

  }





}

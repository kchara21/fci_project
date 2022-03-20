import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { PoolService } from '../services/pool.service';
import { ModalPoolComponent } from '../components/modal-pool/modal-pool.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit, AfterViewInit,OnDestroy  {

  displayedColumns: string[] = ['id', 'codigo', 'camaronera','responsable','acciones'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private poolSvc:PoolService,private _dialog:MatDialog) { }
 
 
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  loadPools():void{
    this.poolSvc.getAll()
    .subscribe(pools=>{
        this.dataSource.data = pools;
      
    })
  }

  ngOnInit(): void {
    this.loadPools();
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
  }


 

  onDeletePool(poolId:number):void{
   
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
        this.poolSvc.delete(poolId)
        .pipe(takeUntil(this.destroy$))
          .subscribe(res=>{
            Swal.fire(
              '¡Eliminado!',
              res?.['message'],
              'success'
            )
            this.loadPools();
          })
      }

      


    })
      
    
    
  }

  onOpenModalPool(pool = {}):void{
    this._dialog.open(ModalPoolComponent,
      {
        height:'400px',
        width:'600px',
        data:{title:'Nueva Piscina',pool}
      })
      .afterClosed().subscribe(res=>{
        this.loadPools();
      })
  }


}

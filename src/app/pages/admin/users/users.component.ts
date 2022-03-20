import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@admin/admin/services/user.service';
import { ModalComponent } from '@admin/admin/components/modal/modal.component';
import { takeUntil, Subject } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'
  ],
  changeDetection:ChangeDetectionStrategy.Default
})
export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {



  displayedColumns: string[] = ['id', 'rol', 'nombre', 'email','piscinas','acciones'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();


  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userSvc:UserService, private _dialog:MatDialog) {
    
  }

  loadUsers():void{
    this.userSvc.getAll()
    .subscribe(users=>{
      this.dataSource.data = users;
    })
  }


  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadUsers();
  }
  

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
  }

  onDelete(userId:number):void{
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
        this.userSvc.delete(userId)
        .pipe(takeUntil(this.destroy$))
          .subscribe(res=>{
            Swal.fire(
              '¡Eliminado!',
              res?.['message'],
              'success'
            )
            this.loadUsers();
          })
      }

    })
     
    

  

  }

  onOpenModal(user={}):void{
   
      this._dialog.open(ModalComponent,
      {
        height:'400px',
        width:'600px',
        data:{title:'Nuevo usuario',user},
        disableClose: true,
      })
      .afterClosed().subscribe(res=>{
        this.loadUsers();
      })

      
   
  }

}

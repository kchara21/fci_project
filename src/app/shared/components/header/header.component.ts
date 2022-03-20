import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../../pages/auth/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserResponse } from '../../models/user.interface';
import { UtilsService } from '@app/shared/service/utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css'
  ]
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAdmin:any = null;
  isLogged = false;

  private _destroy$ = new Subject<any>();
  
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private _authSvc:AuthService, private utilsSvc:UtilsService) { }
 
  ngOnDestroy(): void {
    this._destroy$.next({});
    this._destroy$.complete();
  }

  ngOnInit(): void {
  
    this._authSvc.user$
    .pipe(takeUntil(this._destroy$))
    .subscribe((user:UserResponse)=>{
     
      this.isAdmin = user?.rol;
      if(this.isAdmin){
        this.isLogged = true;
      }else{
        this.isLogged = false;
      }
    
    });

  }

  onToggleSidenav():void{
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.isLogged = false;
    this._authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }



}

import { Component, OnInit } from '@angular/core';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _destroy$ = new Subject<any>();
  isAdmin:any = null;
  isLogged = false;

  
  constructor(public authSvc:AuthService,private _authSvc:AuthService) { }



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




  

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from '@env/environment';
import { catchError, map } from 'rxjs/operators';
import { User, UserResponse,Roles } from '@shared/models/user.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<UserResponse>(null!);


  constructor(private http:HttpClient , private _router:Router) {
      this.checkToken();
   }

  

   get user$(): Observable<UserResponse> {
    return this._user.asObservable();
  }

  get userValue(): UserResponse{
    return this._user.getValue();
  }



  login(authData:User):Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.BASE_URL}/auth/login`,authData)
    .pipe(
      map((user:UserResponse)=>{
    
        //save Token()
        this.saveLocalStorageUser(user)
        this._user.next(user);
        return user;
      }),
     
    )
  }


  logout():void{
    localStorage.removeItem('user'); // TODO: AQUI REMOVEMOS EL TOKEN DEL USUARIO EN EL LOCAL STORAGE
  
    this._user.next(null!);
    this._router.navigate(['login'])
    

  }

  private checkToken():void{
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    

    if(user){
      const isExpired = helper.isTokenExpired(user.token);
      if(isExpired){
        this.logout();
      }else{
        
        this._user.next(user);
      
      }
    }

    
  }

  private saveLocalStorageUser(user:UserResponse):void{
    const {message, ...rest} = user;
    localStorage.setItem('user',JSON.stringify(rest));
  }



  private handlerError(err:Error):Observable<never>{
    let errorMessage = 'Ocurre un error recuperando la Data'
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}

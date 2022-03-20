import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  constructor(private http:HttpClient) { }

  getAll():Observable<any[]>{
    return this.http
    .get<any>(`${environment.BASE_URL}/pool`)
    .pipe(catchError(this.handlerError))
  }

  getByNameandPool(paramName:string,poolCode:string,):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/pool/${paramName}/${poolCode}`)
  }

  new(pool:any):Observable<any>{
    return this.http.post(`${environment.BASE_URL}/pool`,pool)
    .pipe(catchError(this.handlerError));
  }

  update(poolId:number, pool:any):Observable<any>{
    return this.http.patch<any>(`${environment.BASE_URL}/pool/${poolId}`,pool)
    .pipe(catchError(this.handlerError));
  }

  delete(poolId:number):Observable<{}>{
    return this.http.delete<any>(`${environment.BASE_URL}/pool/${poolId}`)
    .pipe(catchError(this.handlerError));
  }
  



  handlerError(error:Error):Observable<never>{
    let errorMessage = 'Error desconocido';
    if(error){
        errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }



}

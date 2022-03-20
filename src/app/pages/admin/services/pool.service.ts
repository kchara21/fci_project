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
    .get<any>(`pool`)
    .pipe(catchError(this.handlerError))
  }

  getByNameandPool(paramName:string,poolCode:string,):Observable<any>{
    return this.http.get<any>(`pool/${paramName}/${poolCode}`)
  }

  new(pool:any):Observable<any>{
    return this.http.post(`pool`,pool)
    .pipe(catchError(this.handlerError));
  }

  update(poolId:number, pool:any):Observable<any>{
    return this.http.patch<any>(`pool/${poolId}`,pool)
    .pipe(catchError(this.handlerError));
  }

  delete(poolId:number):Observable<{}>{
    return this.http.delete<any>(`pool/${poolId}`)
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

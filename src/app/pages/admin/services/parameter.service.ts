import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private http:HttpClient) { }



  getAll():Observable<any[]>{
    return this.http
    .get<any>(`${environment.BASE_URL}/parameter`)
    .pipe(catchError(this.handlerError));
  }

  getByPool(poolName:string):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/parameter/byPool/${poolName}`)
    
  }

  getByParam(paramName:string):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/parameter/${paramName}`)
    .pipe(catchError(this.handlerError));
  }

 

 


  new(parameter:any):Observable<any>{
    return this.http.post(`${environment.BASE_URL}/parameter`,parameter)
    .pipe(catchError(this.handlerError));
  }

  
  newCensus(poolId:number,responsableId:number):Observable<any>{
    return this.http.get(`${environment.BASE_URL}/parameter/census/${poolId}/${responsableId}`)
    .pipe(catchError(this.handlerError));
  }

  update(parameterId:number, parameter:any):Observable<any>{
    return this.http.patch<any>(`${environment.BASE_URL}/parameter/${parameterId}`,parameter)
    .pipe(catchError(this.handlerError));
  }
  
  delete(parameterId:number):Observable<{}>{
    return this.http.delete<any>(`${environment.BASE_URL}/parameter/${parameterId}`)
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

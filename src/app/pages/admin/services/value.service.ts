import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  constructor(private http:HttpClient) {}

  getReportById(poolId:number, parameter:string, start:string,end:string):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/value/getByDate/${poolId}/${parameter}/${start}/${end}`)
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

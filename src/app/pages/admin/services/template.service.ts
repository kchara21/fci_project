import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { 

  }

  
 



  getAll():Observable<any>{
    return this.http
    .get<any>(`${environment.BASE_URL}/template`)
    .pipe(catchError(this.handlerError));
  }

  getById(templateId:number):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/template/${templateId}`)
  }

  getByName(templateName:string):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/template/byName/${templateName}`)
  }

  getTemplateByPool(poolId:number):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/template/byPool/${poolId}`)
  }

  new(template:any):Observable<any>{
    return this.http.post<any>(`${environment.BASE_URL}/template`,template)
    .pipe(catchError(this.handlerError));
  }

  update(templateId:number, template:any):Observable<any>{
    return this.http.patch<any>(`${environment.BASE_URL}/template/${templateId}`,template)
    .pipe(catchError(this.handlerError));
  }

  delete(templateId:number):Observable<{}>{
    return this.http.delete<any>(`${environment.BASE_URL}/template/${templateId}`)
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

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from '../../pages/auth/auth.service';



@Injectable()
export class AdminInterceptor implements HttpInterceptor{
    constructor(private authSvc:AuthService,private _router:Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        
        if( req.url.includes('user') || req.url.includes('template') || req.url.includes('pool') || req.url.includes('parameter') || req.url.includes('api')  || req.url.includes('value')){
            const userValue = this.authSvc.userValue;

            if(!userValue){  
             this._router.navigate([''])
              return next.handle(req);
            }else{
                const authRequest = req.clone({
                
                    setHeaders:{
                        auth:userValue.token,  
                    },
                });
    
                    return next.handle(authRequest);
            }
           
     
        }
       
        return next.handle(req);
        
        

    }
}

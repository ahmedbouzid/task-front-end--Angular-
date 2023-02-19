import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
// le plus nécessaire ici   
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   // console.log(request);
   //request lecture seulement alors il faut clonner une autre 
   const newRequest = request.clone({
headers :request.headers.append('Authorization','Bearer ' + localStorage.getItem('token'))
  })
   //request.headers = request.headers.append('Authorization','Bearer ' + localStorage.getItem('token'))

    return next.handle(newRequest);
    
  }
}

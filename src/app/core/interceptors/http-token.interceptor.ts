import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json'
        'X-Parse-Application-Id':'bAeb3343'
    };

    const token = this.jwtService.getToken();

    if (token) {
      console.log('[INFO] Token get, and set to Interceptor: ', token);
      headersConfig['X-Parse-Session-Token'] = `${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}

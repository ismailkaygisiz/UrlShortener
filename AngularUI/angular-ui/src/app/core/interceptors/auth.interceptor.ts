import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { clientName } from 'src/api';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private httpClient: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this.AddHeader(req);

    return next.handle(req);
  }

  private AddHeader(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        lang: localStorage.getItem('lang') ?? window.navigator.language,
        ClientName: clientName,
      },
    });
  }
}

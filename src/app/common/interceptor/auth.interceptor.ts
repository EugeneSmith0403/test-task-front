import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { LocalStorageEnum } from '../enums';
import { logout } from '../../login/store/actions/login.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = this.router.url;
    if (url.includes('login') && !request.url.includes('auth')) {
      return next.handle(request);
    }
    const token = `Bearer ${this.localStorageService.get(LocalStorageEnum.accessToken)}`;
    const req = request.clone({
      headers: request.headers.set('Authorization', token),
    });
    return next.handle(req)
      .pipe(
        tap(
          (_) => {},
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.localStorageService.set(LocalStorageEnum.accessToken, '');
              }
            }
          }
        ),
        catchError(() => {
          this.store.dispatch(logout());
          return of(null);
        }),
      );
  }
}

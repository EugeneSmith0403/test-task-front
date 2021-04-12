import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {loginAction, loginFailureAction, loginSuccessAction, logout} from '../actions/login.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../common/services/localStorage/localStorage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { LocalStorageEnum } from '../../../common/enums';

@Injectable()
export class LoginEffects {
  constructor(
   private actions$: Actions,
   private readonly loginService: LoginService,
   private readonly router: Router,
   private readonly localStorageService: LocalStorageService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.loginService.login(request).pipe(
          map((user) => {
            if (Object.values(user).length) {
              this.localStorageService.set(LocalStorageEnum.accessToken, user.token);
              return loginSuccessAction({ user });
            }
            throw {
              error: {
                errors: ['User not found'],
              }
            };
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({errors: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

loginAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  loginAfterFailureAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailureAction),
      ),
    { dispatch: false }
  );

  logout$  = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.localStorageService.remove(LocalStorageEnum.accessToken);
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}

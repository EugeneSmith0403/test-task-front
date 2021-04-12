import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from '../../workspace/modules/user/services';
import { IUser } from '../interfaces/state/user';
import { loginUpdateAction, logout } from '../../login/store/actions/login.actions';
import { updateUserSuccess } from '../../workspace/modules/user/store/actions/user.update.action';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<boolean> {
  constructor(
    private readonly store: Store,
    private readonly userService: UserService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isSettings = route?.url[0]?.path;
    return this.userService.getAuthData().pipe(
      tap((user: IUser) => {
        const data = {
          id: user._id,
          token: user.token,
          email: user.email,
          name: user.name,
          rules: user.rules,
        };
        this.store.dispatch(loginUpdateAction({ user: data }));
        if (isSettings) {
          this.store.dispatch(updateUserSuccess({ currentUser: data }));
        }
      }),
      catchError(() => {
        this.store.dispatch(logout());
        return of(null);
      }),
      map(() => true),
    );
  }
}

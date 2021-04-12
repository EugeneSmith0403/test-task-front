import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { LocalStorageService } from '../../services/localStorage/localStorage.service';
import { LocalStorageEnum } from '../../enums';
import {map, tap} from 'rxjs/operators';
import {IUser} from '../../interfaces/state/user';
import {loginUpdateAction} from '../../../login/store/actions/login.actions';
import {updateUserSuccess} from '../../../workspace/modules/user/store/actions/user.update.action';
import {Store} from '@ngrx/store';
import {UserService} from '../../../workspace/modules/user/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly route: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly userService: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isToken = Boolean(this.localStorageService.get(LocalStorageEnum.accessToken));
    const isSettings = route?.url[0]?.path;
    if (!isToken) {
      this.router.navigateByUrl('/login');
    }
    return this.userService.getAuthData().pipe(
      tap((user: IUser) => {
        const data = {
          _id: user._id,
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
      map(() => isToken),
    );
  }
}

import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserById } from '../../workspace/modules/user/store/actions/user.get-by-id.action';
import {map} from 'rxjs/operators';
import {updateUserSuccess} from '../../workspace/modules/user/store/actions/user.update.action';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
  constructor(
    private store: Store,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    if (!id) {
      this.store.dispatch(updateUserSuccess({ currentUser: {
          _id: '',
          token: '',
          email: '',
          name: '',
          rules: ''
        } }));
      return of(true);
    }
    return of(true).pipe(
      map(() => {
        this.store.dispatch(getUserById({id}));
        return true;
      })
    );
  }
}

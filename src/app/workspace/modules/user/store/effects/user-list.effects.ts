import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUserLists, loadUserListsFailure, loadUserListsSuccess } from '../actions/user-list.actions';
import {switchMap, map, catchError} from 'rxjs/operators';
import { UserService } from '../../services';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../../../../common/interfaces/state/user';



@Injectable()
export class UserListEffects {
  constructor(
    private actions$: Actions,
    private readonly userService: UserService,
  ) {}

  userList$ = createEffect(() => this.actions$.pipe(
      ofType(loadUserLists),
      switchMap(() => this.userService.getList().pipe(
        map((userList: IUser[]) => {
          return loadUserListsSuccess({ userList });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(loadUserListsFailure({ errors: errorResponse.error.errors }));
        })
      ))
    )
  );

}

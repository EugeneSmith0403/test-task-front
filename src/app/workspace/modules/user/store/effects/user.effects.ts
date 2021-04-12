import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createUser, createUserFailure, createUserSuccess } from '../actions/user.create.action';
import { updateUser, updateUserFailure, updateUserSuccess } from '../actions/user.update.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { IUser } from '../../../../../common/interfaces/state/user';
import { UserService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { removeUserFromList, removeUserFromListFailure, removeUserFromListSuccess } from '../actions/user.delete.action';
import { getUserById, getUserByIdFailure } from '../actions/user.get-by-id.action';
import { Router } from '@angular/router';



@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private readonly userService: UserService,
              private readonly router: Router,
              ) {}
   userCreate$ = createEffect(() => {
     return this.actions$.pipe(
       ofType(createUser),
       switchMap(({ payload }) => {
        return this.userService.create(payload)
          .pipe(
            map((user: IUser) => {
              return createUserSuccess({ user });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(createUserFailure({ errors: errorResponse.error.errors }));
            })
          );
       })
     );
   });

  userUpdate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ payload }) => {
        const { _id, ...data } = payload;
        return this.userService.update(_id, data)
          .pipe(
            map((currentUser: IUser) => {
              return updateUserSuccess({ currentUser: {...data, _id} });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(updateUserFailure({ errors: errorResponse.error.errors }));
            })
          );
      })
    );
  });

  userRemove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeUserFromList),
      switchMap(({ id }) => {
        return this.userService.remove(id)
          .pipe(
            map(() => {
              return removeUserFromListSuccess({ id });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(removeUserFromListFailure({ errors: errorResponse.error.errors }));
            })
          );
      })
    );
  });

  userGetById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserById),
      switchMap(({ id }) => {
        return this.userService.getById(id)
          .pipe(
            map((currentUser: IUser) => {
              return updateUserSuccess({ currentUser });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(updateUserFailure({ errors: errorResponse.error.errors }));
            })
          );
      })
    );
  });

  userGetByIdFailureAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUserByIdFailure),
        tap(() => {
          this.router.navigateByUrl('/users');
        })
      ),
    { dispatch: false }
  );

}

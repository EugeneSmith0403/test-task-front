import {createAction, props} from '@ngrx/store';
import {userEnum} from '../actionsType';
import {IUser} from '../../../../../common/interfaces/state/user';
import {IBackendErrors} from '../../../../../common/interfaces';

export const createUser = createAction(
  userEnum.createUser,
  props<{payload: IUser}>()
);

export const createUserSuccess = createAction(
  userEnum.createUserSuccess,
  props<{ user: IUser }>()
);

export const createUserFailure = createAction(
  userEnum.createUserFailure,
  props<{ errors: IBackendErrors }>()
);

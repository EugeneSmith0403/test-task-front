import { createAction, props } from '@ngrx/store';
import { IBackendErrors } from '../../../../../common/interfaces';
import { userEnum } from '../actionsType';
import { IUser } from '../../../../../common/interfaces/state/user';

export const loadUser = createAction(
  userEnum.loadUser,
);

export const loadUserSuccess = createAction(
  userEnum.loadUserSuccess,
  props<{ currentUser: IUser }>()
);

export const loadUserFailure = createAction(
  userEnum.loadUserFailure,
  props<{ errors: IBackendErrors }>()
);

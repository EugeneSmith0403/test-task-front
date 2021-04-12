import { createAction, props } from '@ngrx/store';
import { userEnum } from '../actionsType';
import { IUser } from '../../../../../common/interfaces/state/user';
import { IBackendErrors } from '../../../../../common/interfaces';

export const updateUser = createAction(
  userEnum.updateUser,
  props<{ payload: IUser }>()
);

export const updateUserSuccess = createAction(
  userEnum.updateUserSuccess,
  props<{ currentUser: IUser }>()
);

export const updateUserFailure = createAction(
  userEnum.updateUserFailure,
  props<{ errors: IBackendErrors }>()
);

import { createAction, props } from '@ngrx/store';
import { userListEnum } from '../actionsType';
import { IUser } from '../../../../../common/interfaces/state/user';
import { IBackendErrors } from '../../../../../common/interfaces';

export const loadUserLists = createAction(
  userListEnum.loadUserLists
);

export const loadUserListsSuccess = createAction(
  userListEnum.loadUserListsSuccess,
  props<{ userList: IUser[] }>()
);

export const loadUserListsFailure = createAction(
  userListEnum.loadUserListsFailure,
  props<{ errors: IBackendErrors }>()
);

import { createAction, props } from '@ngrx/store';
import { actionsType } from '../actionsType';
import { IBackendErrors, ILoginRequest, ILoginSuccess } from '../../../common/interfaces';

export const loginAction = createAction(
  actionsType.login,
  props<{request: ILoginRequest}>()
);

export const loginSuccessAction = createAction(
  actionsType.loginSuccess,
  props<{ user: ILoginSuccess }>()
);

export const loginUpdateAction = createAction(
  actionsType.loginUpdateSuccess,
  props<{ user: ILoginSuccess }>()
);

export const loginFailureAction = createAction(
  actionsType.loginFailure,
  props<{ errors: IBackendErrors }>()
);

export const logout = createAction(
  actionsType.logout
);

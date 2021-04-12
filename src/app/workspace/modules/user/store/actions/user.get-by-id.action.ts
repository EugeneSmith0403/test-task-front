import { createAction, props } from '@ngrx/store';
import { userEnum } from '../actionsType';
import { IBackendErrors } from '../../../../../common/interfaces';

export const getUserById = createAction(
  userEnum.getUserById,
  props<{id: string}>()
);

export const getUserByIdFailure = createAction(
  userEnum.getUserByIdFailure,
  props<{ errors: IBackendErrors }>()
);

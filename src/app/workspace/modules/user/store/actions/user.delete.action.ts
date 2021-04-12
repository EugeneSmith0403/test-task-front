import { createAction, props } from '@ngrx/store';
import { userEnum } from '../actionsType';
import { IBackendErrors } from '../../../../../common/interfaces';

export const removeUserFromList = createAction(
  userEnum.removeUserFromList,
  props<{id: string}>()
);

export const removeUserFromListSuccess = createAction(
  userEnum.removeUserFromListSuccess,
  props<{ id: string }>()
);

export const removeUserFromListFailure = createAction(
  userEnum.removeUserFromListFailure,
  props<{ errors: IBackendErrors }>()
);

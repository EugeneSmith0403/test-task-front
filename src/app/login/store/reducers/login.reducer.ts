import { Action, createReducer, on } from '@ngrx/store';
import { loginAction, loginFailureAction, loginSuccessAction, loginUpdateAction } from '../actions/login.actions';
import { ILoginState } from '../../../common/interfaces';

export const initialState: ILoginState = {
  email: '',
  name: '',
  token: '',
  isSubmitting: false,
  validationErrors: null,
  rules: '',
};


export const loginReducer = createReducer(
  initialState,
  on(
    loginAction,
    (state): ILoginState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    loginSuccessAction,
    (state, action): ILoginState => ({
      ...state,
      ...action.user,
      isSubmitting: false,
    })
  ),
  on(
    loginUpdateAction,
    (state, action): ILoginState => ({
      ...state,
      ...action.user,
      isSubmitting: false,
    })
  ),
  on(
    loginFailureAction,
    (state, action): ILoginState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);

export const loginReducers = (state: ILoginState, action: Action) => {
  return loginReducer(state, action);
};

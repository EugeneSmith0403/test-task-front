import { createReducer, on } from '@ngrx/store';
import { IBackendErrors } from '../../../../../common/interfaces';
import { createUser, createUserFailure, createUserSuccess } from '../actions/user.create.action';
import { getUserById } from '../actions/user.get-by-id.action';
import { loadUser, loadUserSuccess, loadUserFailure } from '../actions/user.load.actions';
import { updateUser, updateUserFailure, updateUserSuccess } from '../actions/user.update.action';

export interface IUserState {
  _id?: string;
  name?: string;
  password?: string;
  token?: string;
  email?: string;
  isSubmitting?: boolean;
  validationErrors?: IBackendErrors | null;
}

export const initialState: IUserState = {
  name: '',
  password: '',
  token: '',
  email: '',
  isSubmitting: false,
  validationErrors: null
};


export const currentUserReducer = createReducer(
  initialState,
  on(
    loadUser,
    (state): IUserState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    loadUserSuccess,
    (state, action): IUserState => ({
      ...state,
      ...action.currentUser,
      isSubmitting: false,
    })
  ),
  on(
    loadUserFailure,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),

  on(
    createUser,
    (state): IUserState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    createUserSuccess,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    createUserFailure,
    (state, action): IUserState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),

  on(
    updateUser,
    (state): IUserState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    getUserById,
    (state): IUserState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    updateUserSuccess,
    (state, action): IUserState => ({
      ...state,
      ...action.currentUser,
      isSubmitting: false,
      validationErrors: null
    })
  ),
  on(
    updateUserFailure,
    (state): IUserState => ({
      ...state,
      isSubmitting: false,
      validationErrors: null
    })
  ),
);


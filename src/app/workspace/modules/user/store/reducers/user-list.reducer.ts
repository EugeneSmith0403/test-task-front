import { createReducer, on } from '@ngrx/store';
import {IUser} from '../../../../../common/interfaces/state/user';
import {IBackendErrors} from '../../../../../common/interfaces';
import { loadUserLists, loadUserListsSuccess, loadUserListsFailure } from '../actions/user-list.actions';
import { removeUserFromList, removeUserFromListFailure, removeUserFromListSuccess } from '../actions/user.delete.action';

export interface IUserListState {
  list: IUser[];
  validationErrors?: IBackendErrors | null;
  loading: boolean;
}

export const initialState: IUserListState = {
  list: [],
  validationErrors: null,
  loading: false,
};


export const userListReducer = createReducer(
  initialState,
  on(
    loadUserLists,
    (state): IUserListState => ({
      ...state,
      validationErrors: null,
      loading: true,
    })
  ),
  on(
    loadUserListsSuccess,
    (state, action): IUserListState => ({
      ...state,
      list: action.userList,
      loading: false,
    })
  ),
  on(
    loadUserListsFailure,
    (state, action): IUserListState => ({
      ...state,
      validationErrors: action.errors,
      loading: false,
    })
  ),
  on(
    removeUserFromList,
    (state): IUserListState => ({
      ...state,
      validationErrors: null,
      loading: true,
    })
  ),
  on(
    removeUserFromListSuccess,
    (state, action): IUserListState => ({
      ...state,
      list: state.list.filter(({ _id }) => _id !== action.id),
      validationErrors: null,
      loading: false,
    })
  ),
  on(
    removeUserFromListFailure,
    (state): IUserListState => ({
      ...state,
      validationErrors: null,
      loading: false,
    })
  ),
);


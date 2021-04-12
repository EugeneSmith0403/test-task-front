import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../../../../../common/interfaces';
import { IUserListState } from '../reducers/user-list.reducer';

export const userListFeatureSelector = createFeatureSelector<IAppState, IUserListState>('userList');

export const userListSelector = createSelector(
  userListFeatureSelector,
  (state: IUserListState) => state.list
);

export const isLoadingUserList = createSelector(
  userListFeatureSelector,
  (state: IUserListState) => state.loading
);

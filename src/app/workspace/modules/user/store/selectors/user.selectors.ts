import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../reducers/currentUserReducer';
import { IAppState } from '../../../../../common/interfaces';

export const userFeatureSelector = createFeatureSelector<IAppState, IUserState>('currentUser');

export const currentUserSelector = createSelector(
  userFeatureSelector,
  (state: IUserState) => state
);

export const isSubmitting = createSelector(
  userFeatureSelector,
  (state: IUserState) => state.isSubmitting
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState, ILoginState } from '../../../common/interfaces';

export const loginFeatureSelector = createFeatureSelector<IAppState, ILoginState>('login');

export const isSubmittingSelector = createSelector(
  loginFeatureSelector,
  (loginState: ILoginState) => loginState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  loginFeatureSelector,
  (loginState: ILoginState) => loginState.validationErrors
);

export const isAdminSelector = createSelector(
  loginFeatureSelector,
  (loginState: ILoginState) => loginState.rules === 'Admin'
);

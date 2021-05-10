import { ILoginState } from '../../../common/interfaces';
import { initialState, loginReducers } from './login.reducer';
import {loginAction, loginFailureAction, loginSuccessAction, loginUpdateAction} from '../actions/login.actions';

describe('Login Reducer', () => {

    let state: ILoginState;
    beforeEach(() => {
        state = initialState;
    });

    it('Execute loginAction', () => {
        const result = loginReducers(state, loginAction);
        expect(result.validationErrors).toBeNull();
        expect(result.isSubmitting).toBeTrue();
    });

    it('Execute loginSuccessAction', () => {
        const result = loginReducers(state, loginSuccessAction);
        expect(result).toEqual(state);
    });

    it('Execute loginUpdateAction', () => {
        const result = loginReducers(state, loginUpdateAction);
        expect(result).toEqual(state);
    });

    it('Execute loginUpdateAction', () => {
        const errors = { errors: { message: ['something went wrong'] } };
        const result = loginReducers(state, loginFailureAction(errors));
        expect(result.validationErrors).toEqual(errors.errors);
    });

});

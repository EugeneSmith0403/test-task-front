import { ILoginState } from '../../../common/interfaces';
import { isAdminSelector, isSubmittingSelector, validationErrorsSelector } from './login.selectors';
import { getMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';

describe('Login Selectors', () => {
    const unsubscribe = new Subject<void>();
    const initialState: ILoginState = {
        email: 'test@test.com',
        name: 'test',
        token: 'yeeeeep',
        isSubmitting: false,
        validationErrors: null,
        rules: 'User',
    };
    let store;
    beforeEach(() => {
        store = getMockStore({
            initialState,
            selectors: [
                { selector: isSubmittingSelector, value: initialState.isSubmitting },
                { selector: validationErrorsSelector, value: initialState.validationErrors },
                { selector: isAdminSelector, value: initialState.rules === 'Admin' },
            ],
        });
    });

    it('isSubmittingSelector', () => {
        store.select(isSubmittingSelector).subscribe((res) => expect(res).toBeFalse());
    });

    it('validationErrorsSelector', () => {
        store.select(validationErrorsSelector).subscribe((res) => expect(res).toBeNull());
    });

    it('isAdminSelector', () => {
        store.select(isAdminSelector).subscribe((res) => expect(res).toBeFalse());
    });

    afterEach(() => {
        unsubscribe.next();
        unsubscribe.complete();
    });
});

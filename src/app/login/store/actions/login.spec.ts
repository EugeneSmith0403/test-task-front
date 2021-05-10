import {loginAction, loginFailureAction, loginSuccessAction, loginUpdateAction, logout} from './login.actions';
import {IBackendErrors, ILoginRequest, ILoginSuccess} from '../../../common/interfaces';
import {actionsType} from '../actionsType';

describe('login actions', () => {

    it('should create login action', () => {
        expect(loginAction).toBeTruthy();
    });

    it('should create login action', () => {
        expect(loginSuccessAction).toBeTruthy();
    });

    it('should create login action', () => {
        expect(loginUpdateAction).toBeTruthy();
    });

    it('should create login action', () => {
        expect(loginFailureAction).toBeTruthy();
    });

    it('should create login action', () => {
        expect(logout).toBeTruthy();
    });

    it('loginAction execute', () => {
        const request: ILoginRequest = { email: 'test@email.ru', password: '111' };
        const loginAct = loginAction({ request });
        expect(loginAct.type).toEqual(actionsType.login);
        expect(loginAct.request).toEqual(request);
    });

    it('loginSuccessAction execute', () => {
        const successData: ILoginSuccess = { rules: '', name: '', token: ''};
        const loginSuccessAct = loginSuccessAction({ user: successData });
        expect(loginSuccessAct.type).toEqual(actionsType.loginSuccess);
        expect(loginSuccessAct.user).toEqual(successData);
    });

    it('loginUpdateAction execute', () => {
        const successData: ILoginSuccess = { rules: '', name: '', token: ''};
        const loginUpdateAct = loginUpdateAction({ user: successData });
        expect(loginUpdateAct.type).toEqual(actionsType.loginUpdateSuccess);
        expect(loginUpdateAct.user).toEqual(successData);
    });

    it('loginUpdateAction execute', () => {
        const errors = { errors: { er: ['somithing went wrong'] } };
        const loginErrorAct = loginFailureAction(errors);
        expect(loginErrorAct.type).toEqual(actionsType.loginFailure);
        expect(loginErrorAct.errors).toEqual(errors.errors);
    });

    it('logout', () => {
        const logoutAct = logout();
        expect(logoutAct.type).toEqual(actionsType.logout);
    });
});

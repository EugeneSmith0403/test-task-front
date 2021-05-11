import {Observable, of, Subject} from 'rxjs';
import { LoginEffects } from './login.effects';
import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../reducers/login.reducer';
import { ILoginSuccess } from '../../../common/interfaces';
import { LoginService } from '../../services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../common/services/localStorage/localStorage.service';
import { actionsType } from '../actionsType';

describe('Login effects', () => {
    let effects: LoginEffects;
    let store: Store;
    let loginService: LoginService;
    let localStorageService: LocalStorageService;
    const actions = new Observable<any>();
    const unsubscribe = new Subject<void>();

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [],
            providers: [
                LoginEffects,
                HttpClientTestingModule,
                RouterTestingModule,
                provideMockActions(() => actions),
                provideMockStore({
                    initialState
                }),
                {
                    provide: LoginService,
                    useValue: jasmine.createSpyObj('LoginService', ['login']),
                },
                {
                    provide: LocalStorageService,
                    useValue: jasmine.createSpyObj('LocalStorageService', ['get', 'set']),
                },
                {
                    provide: Router,
                    useValue: {}
                },
            ]
        });
        effects = TestBed.inject<LoginEffects>(LoginEffects);
        store = TestBed.inject(Store);
        loginService = TestBed.inject(LoginService);
        localStorageService = TestBed.inject(LocalStorageService);
    });

    it('login$ success handler', () => {
        const userSuccess: ILoginSuccess = {
            name: 'test',
            token: 'yeeep',
            rules: 'User'
        };
        // @ts-ignore
        loginService.login.and.returnValue(of( userSuccess ));
        effects.login$.subscribe((action) => {
            expect(action).toEqual({
                type: actionsType.loginSuccess,
                user: userSuccess,
            });
        });
    });

    it('login$ error handler', () => {
        const textError = 'User not found';
        // @ts-ignore
        loginService.login.and.returnValue(of( {} ));
        effects.login$.subscribe((action) => {
            console.log(action);
            expect(action.type).toEqual(actionsType.loginFailure);
            // @ts-ignore
            expect(action.errors).toEqual([textError]);
        });
    });

    afterEach(() => {
        unsubscribe.next();
        unsubscribe.complete();
    });
});

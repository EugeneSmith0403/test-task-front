import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { addMatchers, cold, initTestScheduler } from 'jasmine-marbles';
import { By } from '@angular/platform-browser';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let store: Store;
    const unsubscribe = new Subject<void>();

    beforeEach(async () => {
        initTestScheduler();
        addMatchers();
        await TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            imports: [ReactiveFormsModule, FormsModule],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        dispatch: jasmine.createSpy('dispatch'),
                        pipe: jasmine.createSpy('pipe'),
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        store = jasmine.createSpyObj('store', ['dispatch', 'select']);
    });

    afterEach(() => {
        unsubscribe.next();
        unsubscribe.complete();
    });


    it('LoginFormComponent should create', () => {
        expect(component).toBeTruthy();
    });

    it('LoginFormComponent execute login', () => {
        const spy = spyOn(component, 'login').and.callFake(() => undefined);
        component.login({} as Event);
        expect(spy).toHaveBeenCalledWith({} as Event);
    });

    it('LoginFormComponent execute ngOnInit', () => {
        const spy = spyOn(component, 'ngOnInit').and.callFake(() => undefined);
        component.ngOnInit();
        const form = fixture.debugElement.query(By.css('form'));
        expect(spy).toHaveBeenCalled();
        expect(form).toBeTruthy();
    });

    it('LoginFormComponent ngOnInit isSubmitting$ fill', () => {
        const mockIsSubmit$ = cold('', false);
        // @ts-ignore
        store.select.and.callFake(() => mockIsSubmit$);
        const mockSelector = () => ({});
        component.isSubmitting$ = store.select(mockSelector) as Observable<boolean>;
        expect(component.isSubmitting$).toBeObservable(mockIsSubmit$);
    });

    it('LoginFormComponent ngOnInit backendErrors$ fill', () => {
        const mockIsBackendErrors$ = cold('', null);
        const errorsEl = fixture.debugElement.query(By.css('.message-text'));
        // @ts-ignore
        store.select.and.callFake(() => mockIsBackendErrors$);
        const mockSelector = () => ({});
        component.isSubmitting$ = store.select(mockSelector) as Observable<boolean>;
        expect(component.isSubmitting$).toBeObservable(mockIsBackendErrors$);
        expect(errorsEl).toBe(null);
    });
});

import {MessageErrorComponent} from './message-error.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Subject} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('messageErrorComponent', () => {
    let fixture;
    let component: ComponentFixture<MessageErrorComponent>;
    const unsubscribe = new Subject<void>();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageErrorComponent],
            imports: [],
            providers: [],
        }).compileComponents();
    });

    afterEach(() => {
        unsubscribe.next();
        unsubscribe.complete();
    });

    beforeEach(() => { // 3
        fixture = TestBed.createComponent(MessageErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('MessageErrorComponent should create', () => {
        expect(component).toBeTruthy();
    });

    it('MessageErrorComponent fill message input', () => {
        const messages = ['error test', 'error test2'];
        fixture.componentInstance.messages = messages;
        fixture.detectChanges();
        const nodeList = fixture.debugElement.queryAll(By.css('.alert div'));
        expect(nodeList.length).toEqual(messages.length);
    });

    it('MessageErrorComponent check styleMessage Input', () => {
        fixture.componentInstance.styleMessage = 'test';
        fixture.detectChanges();
        const isStyleContain = fixture.debugElement.query(By.css('.alert'))
            .nativeElement.classList.contains(`alert-${fixture.componentInstance.styleMessage}`);
        expect(isStyleContain).toBeTrue();
    });

    it('MessageErrorComponent check default class', () => {
       expect(fixture.componentInstance.defaultStyle).toBe('danger');
       const isStyleContain = fixture.debugElement.query(By.css('.alert'))
            .nativeElement.classList.contains('alert-danger');
       expect(isStyleContain).toBeTrue();
    });
});

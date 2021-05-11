import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
    let component;

    beforeEach(() => {
        component = new BaseComponent();
    });

    it('should component create', () => {
        expect(component).toBeTruthy();
    });
});

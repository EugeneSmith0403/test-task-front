import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalStorageService } from './localStorage.service';

describe('LocalStorageService', () => {
    let service;
    let httpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: LocalStorageService,
                    useValue: jasmine.createSpyObj('LocalStorageService', ['get', 'set', 'remove']),
                },
            ],
            imports: [HttpClientTestingModule],
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LocalStorageService);
    });

    it('LocalStorageService should be created', () => {
        expect(service).toBeTruthy();
    });

    it('LocalStorageService get', () => {
        const mockValue = 'cookie';
        service.get.and.returnValue(mockValue);
        const getDataSpy = service.get('test');
        expect(getDataSpy).toBe(mockValue);
        expect(service.get).toHaveBeenCalledWith('test');
    });

    it('LocalStorageService set', () => {
        const mockData = '{ data: 1}';
        const mockLocalName = 'name';
        const setDataSpy = service.set.and.returnValue();
        const result = service.set(mockLocalName, mockData);
        expect(result).toBeUndefined();
        expect(setDataSpy).toHaveBeenCalledWith(mockLocalName, mockData);
    });

    it('LocalStorageService remove', () => {
        const removeSpy = service.remove.and.returnValue();
        const mockParam = 'test';
        const result = service.remove(mockParam);
        expect(result).toBeUndefined();
        expect(removeSpy).toHaveBeenCalledWith(mockParam);
    });
});

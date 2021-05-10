import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { IUser } from '../../common/interfaces/state/user';
import { environment } from '../../../environments/environment';

describe('LoginService', () => {
    let service: LoginService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginService],
            imports: [HttpClientTestingModule],
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('LoginService should be created', () => {
        expect(service).toBeTruthy();
    });

    it('LoginService execute login method', (done) => {
        const userData = { password: 'test', email: 'email.test.com' };
        const mockResultData: IUser = {
            _id: '',
            name: 'test',
            email: 'email.test.com',
            password: 'test',
            token: '',
            rules: '',
        };
        service.login(userData).subscribe((res) => {
            expect(res).toEqual(mockResultData);
            done();
        });
        const req = httpTestingController.expectOne(`${environment.apiUrl}/users/login`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(userData, { status: 200, statusText: 'Ok' });
        req.flush(mockResultData);
    });
});

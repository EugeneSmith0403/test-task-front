import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient
  ) { }

  public login(credential: { email: string, password: string }): Observable<any> {
    const url = `${environment.apiUrl}/users/login`;
    return this.http.post(url, credential);
  }

}

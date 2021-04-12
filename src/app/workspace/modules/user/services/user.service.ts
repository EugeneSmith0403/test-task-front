import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IUser} from '../../../../common/interfaces/state/user';
import {LocalStorageService} from '../../../../common/services/localStorage/localStorage.service';
import {LocalStorageEnum} from '../../../../common/enums';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.apiUrl}/users`;
  constructor(
    private http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) { }

  public getList(): Observable<IUser[]> {
    return this.http.post<IUser[]>(`${this.url}/all`, {});
  }

  public getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`);
  }

  public update(id: string, credentials: IUser): Observable<IUser> {
    return this.http.patch<IUser>(`${this.url}/${id}`, credentials);
  }

  public create(credentials: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}`, credentials);
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  public getAuthData(): Observable<IUser> {
    const token = this.localStorageService.get(LocalStorageEnum.accessToken);
    if (token) {
      return this.http.post<IUser>(`${this.url}/auth`, {});
    }
    return of(null);
  }
}

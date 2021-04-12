import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { LocalStorageService } from '../../services/localStorage/localStorage.service';
import { LocalStorageEnum } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(
    private route: Router,
    private localStorageService: LocalStorageService,
    private readonly router: Router,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isToken = Boolean(this.localStorageService.get(LocalStorageEnum.accessToken));
    if (isToken) {
      this.router.navigateByUrl('/');
    }
    return of(!isToken);
  }

}

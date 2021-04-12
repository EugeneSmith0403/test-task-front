import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../common/services/localStorage/localStorage.service';
import { isAdminSelector } from '../../../login/store/selectors/login.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../../login/store/actions/login.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userName: any;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly store: Store
  ) { }
  public isAdmin$: Observable<boolean>;

  public ngOnInit(): void {
    this.isAdmin$ = this.store.pipe(
      select(isAdminSelector),
    );
  }
  public logout(): void {
    this.store.dispatch(logout());
  }
}

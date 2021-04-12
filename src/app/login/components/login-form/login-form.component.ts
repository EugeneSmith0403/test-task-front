import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IBackendErrors, ILoginRequest } from '../../../common/interfaces/state/login';
import { loginAction } from '../../store/actions/login.actions';
import { Observable } from 'rxjs';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors/login.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<IBackendErrors>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) { }

  public loginForm: FormGroup = this.fb.group({
    email: new FormControl(),
    password: new FormControl(),
  });

  public ngOnInit(): void {
    this.isSubmitting$ = this.store
      .pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  public login($event: Event): void {
    if (this.loginForm.valid) {
      const request: ILoginRequest = this.loginForm.value;
      this.store.dispatch(loginAction({ request }));
    }
  }
}

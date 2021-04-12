import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBackendErrors } from '../../../../../common/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { currentUserSelector, isSubmitting } from '../../store/selectors/user.selectors';
import { BaseComponent } from '../../../../../common/components/base-component/base.component';
import { takeUntil, tap } from 'rxjs/operators';
import { updateUser } from '../../store/actions/user.update.action';
import { createUser } from '../../store/actions/user.create.action';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {
    super();
  }
  public userForm: FormGroup = this.fb.group({
    name: new FormControl(undefined),
    email: new FormControl(undefined),
    password: new FormControl(undefined),
  });
  public id = '';
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<IBackendErrors>;

  public ngOnInit(): void {
    this.store.pipe(
      select(currentUserSelector),
      tap((user) => {
        this.id = user._id;
        this.userForm.patchValue(user);
      }),
      takeUntil(this.ngUnsubscribe),
    ).subscribe();

    this.isSubmitting$ = this.store
      .pipe(
        select(isSubmitting)
      );
  }

  public save(): void {
      if (this.userForm.valid) {
        if (this.id) {
          this.store.dispatch(updateUser({payload: {_id: this.id, ...this.userForm.value}}));
        }else {
          this.store.dispatch(createUser({payload: { ...this.userForm.value }}));
        }
      }
  }
}

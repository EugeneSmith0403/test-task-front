import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadUserLists } from '../../store/actions/user-list.actions';
import { IUser } from '../../../../../common/interfaces/state/user';
import { Observable } from 'rxjs';
import {isLoadingUserList, userListSelector} from '../../store/selectors/user-list.selectors';
import { removeUserFromList } from '../../store/actions/user.delete.action';
import { User } from '../../../../../common/models';
import { isSubmitting } from '../../store/selectors/user.selectors';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public userList$: Observable<IUser[]>;
  public tableFields: string[];
  public isSubmitting$: Observable<boolean>;
  public isLoading$: Observable<boolean>;

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {

    const userModel = new User();
    this.tableFields = Object.keys(userModel).filter((name) => name !== 'rules' && name !== 'token');
    this.store.dispatch(loadUserLists());
    this.userList$ = this.store
      .pipe(
        select(userListSelector));

    this.isSubmitting$ = this.store
      .pipe(
        select(isSubmitting)
      );

    this.isLoading$ = this.store
      .pipe(
        select(isLoadingUserList)
      );
  }

  public remove(id: string): void {
    this.store.dispatch(removeUserFromList({ id }));
  }
}

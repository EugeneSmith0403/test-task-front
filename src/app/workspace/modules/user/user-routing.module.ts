import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import { UserResolver } from '../../../common/resolvers/user.resolver';
import {CurrentUserResolver} from '../../../common/resolvers/currentUser.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children: [],
  },
  {
    path: 'create',
    component: UserFormComponent,
    resolve: {
      user: UserResolver,
    }
  },
  {
    path: 'settings',
    component: UserFormComponent,
    resolve: {
      user: CurrentUserResolver,
    }
  },
  {
    path: ':id',
    component: UserFormComponent,
    resolve: {
      user : UserResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

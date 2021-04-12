import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { UserListEffects } from './store/effects/user-list.effects';
import { StoreModule } from '@ngrx/store';
import { userListReducer } from './store/reducers/user-list.reducer';
import { currentUserReducer } from './store/reducers/currentUserReducer';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '../../../login/login.module';


@NgModule({
  declarations: [UserListComponent, UserFormComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        EffectsModule.forFeature([UserEffects, UserListEffects]),
        StoreModule.forFeature('userList', userListReducer),
        StoreModule.forFeature('currentUser', currentUserReducer),
        ReactiveFormsModule,
        LoginModule,
    ]
})
export class UserModule { }

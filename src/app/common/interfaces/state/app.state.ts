import { ILoginState } from './login';
import { IUserState } from '../../../workspace/modules/user/store/reducers/currentUserReducer';
import { IUserListState } from '../../../workspace/modules/user/store/reducers/user-list.reducer';

export interface IAppState {
  login: ILoginState;
  currentUser: IUserState;
  userList: IUserListState;
}

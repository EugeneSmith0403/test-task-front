import { IUser } from '../interfaces/state/user';

export class User implements IUser {
  public _id = '';
  public name = '';
  public email = '';
  public password = '';
  public token = '';
  public rules = '';
}

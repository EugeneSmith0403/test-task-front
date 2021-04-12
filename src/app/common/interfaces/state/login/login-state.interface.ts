import { IBackendErrors } from './index';

export interface ILoginState {
  email: string;
  name: string;
  token: string;
  rules: string;
  isSubmitting?: boolean;
  validationErrors?: IBackendErrors | null;
}

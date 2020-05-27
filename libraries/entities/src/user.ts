import { Session } from './session';

export interface User {
  authority: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  role: string;
  session: Session | null;
  state: string;
  username: string;
}

export interface RecaptchaUser extends User {
  recaptchaResponse: string;
}

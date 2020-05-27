import { Session } from './session';
import { User } from './user';

export interface AuthBody {
  session: Session;
  user: User;
}

import { sendRequest, createJsonRequest } from '../utils';
import { User } from '@routerating/entities';

export function login(email: string, password: string): Promise<Response> {
  return sendRequest(
    createJsonRequest('auth/login', undefined, 'POST', undefined, undefined, {
      email,
      password,
    })
  );
}

export function createBasic(user: User): Promise<Response> {
  return sendRequest(
    createJsonRequest('auth', undefined, 'POST', undefined, undefined, user)
  );
}

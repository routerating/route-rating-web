import { createJsonRequest, sendRequest } from '../utils'

import { BaseUser } from '@routerating/interfaces/dist/types/user'
import { User } from '@routerating/interfaces'

export function login(
  url: string,
  email: string,
  password: string
): Promise<Response> {
  return sendRequest(
    createJsonRequest(
      url,
      'auth/login',
      undefined,
      'POST',
      undefined,
      undefined,
      {
        email,
        password,
      }
    )
  )
}

export function createBasicUser(
  url: string,
  user: BaseUser
): Promise<Response> {
  return sendRequest(
    createJsonRequest(
      url,
      'users/create',
      undefined,
      'POST',
      undefined,
      undefined,
      user
    )
  )
}

export function createAdminUser(
  url: string,
  user: BaseUser,
  authorization?: string,
  refresh?: string
): Promise<Response> {
  return sendRequest(
    createJsonRequest(
      url,
      'users/create/admin',
      undefined,
      'POST',
      authorization,
      refresh,
      user
    )
  )
}

export function updateUser(url: string, user: User): Promise<Response> {
  return sendRequest(
    createJsonRequest(
      url,
      'users',
      undefined,
      'PUT',
      undefined,
      undefined,
      user
    )
  )
}

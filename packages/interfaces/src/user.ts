import { Session } from './session'

export interface BaseUser {
  city: string
  email: string
  firstName: string
  lastName: string
  password: string
  phoneNumber: string
  state: string
}

export interface User extends BaseUser {
  authority: string
  id: string
  role: string
  session?: Session
}

export interface RecaptchaUser extends User {
  recaptchaResponse: string
}

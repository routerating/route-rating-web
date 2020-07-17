import { createStore } from '@stencil/store'

export interface AuthState {
  signedIn: boolean
  authToken?: string | null
  refreshToken?: string | null
}

const { state } = createStore<AuthState>({
  signedIn: false,
})

export default state

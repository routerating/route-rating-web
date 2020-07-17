import { Component, Host, h } from '@stencil/core'

import { HTMLEvent } from '@routerating/components'
import authStore from '../../stores/auth'
import { login } from '@routerating/requests'
import toastStore from '../../stores/toast'

interface Refs {
  email?: HTMLRrInputElement
  password?: HTMLRrInputElement
}

@Component({
  tag: 'app-sign-in-page',
  styleUrl: 'app-sign-in-page.scss',
  shadow: true,
})
export class AppSignInPage {
  private refs: Refs = {}

  render() {
    return (
      <Host>
        <app-form>
          <h1 class="centered">Sign In</h1>
          <form onSubmit={this.handleSubmit}>
            <rr-input
              label="Email"
              type="text"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.email = element
              }}
            />
            <rr-input
              label="Password"
              type="password"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.password = element
              }}
            />
            <div class="centered">
              <button type="submit" class="purple-button">
                Sign In
              </button>
            </div>
          </form>
        </app-form>
        <div class="centered">
          <stencil-route-link url="/signup" exact={true}>
            Create an account
          </stencil-route-link>
        </div>
      </Host>
    )
  }

  private handleSubmit = async (event: HTMLEvent): Promise<void> => {
    event.preventDefault()

    const response = await login(
      'http://localhost:3000/dev',
      (await this.refs.email?.getValue()) ?? '',
      (await this.refs.password?.getValue()) ?? ''
    )

    if (response.ok) {
      authStore.authToken = response.headers.get('Authorization')
      authStore.refreshToken = response.headers.get('Refresh')
      authStore.signedIn = response.headers.get('Authorization') !== null

      toastStore.message = 'You have been signed in.'
    } else {
      toastStore.message =
        'Unable to sign in. Verify your sign in information is correct.'
    }
  }
}

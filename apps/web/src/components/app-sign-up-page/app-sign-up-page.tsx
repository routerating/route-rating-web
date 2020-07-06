import { Component, Host, h } from '@stencil/core'

import { HTMLEvent } from '@routerating/components'
import authStore from '../../stores/auth'
import { createBasicUser } from '@routerating/requests'
import toastStore from '../../stores/toast'

interface Refs {
  firstName?: HTMLRrInputElement
  lastName?: HTMLRrInputElement
  email?: HTMLRrInputElement
  phoneNumber?: HTMLRrInputElement
  city?: HTMLRrInputElement
  state?: HTMLRrInputElement
  password?: HTMLRrInputElement
  repeatPassword?: HTMLRrInputElement
}

@Component({
  tag: 'app-sign-up-page',
  styleUrl: 'app-sign-up-page.scss',
  shadow: true,
})
export class AppSignUpPage {
  private refs: Refs = {}

  render() {
    return (
      <Host>
        <app-form>
          <h1 class="centered">Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <rr-input
              label="First name"
              type="text"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.firstName = element
              }}
            />
            <rr-input
              label="Last name"
              type="text"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.lastName = element
              }}
            />
            <rr-input
              label="Email"
              type="text"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.email = element
              }}
            />
            <rr-input
              label="City"
              type="text"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.city = element
              }}
            />
            <rr-input
              label="State"
              type="text"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.state = element
              }}
            />
            <rr-input
              label="Phone number"
              type="text"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.phoneNumber = element
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
            <rr-input
              label="Repeat password"
              type="password"
              required
              ref={(element?: HTMLRrInputElement): void => {
                this.refs.repeatPassword = element
              }}
            />
            <div class="centered">
              <button type="submit" class="purple-button">
                Sign Up
              </button>
            </div>
          </form>
        </app-form>
      </Host>
    )
  }

  private handleSubmit = async (event: HTMLEvent): Promise<void> => {
    event.preventDefault()

    if (
      (await this.refs.password?.getValue()) !==
      (await this.refs.repeatPassword?.getValue())
    ) {
      toastStore.message = 'Passwords must match.'
      return
    }

    const response = await createBasicUser('http://localhost:3000/dev', {
      firstName: (await this.refs.firstName?.getValue()) ?? '',
      lastName: (await this.refs.lastName?.getValue()) ?? '',
      email: (await this.refs.email?.getValue()) ?? '',
      phoneNumber: (await this.refs.phoneNumber?.getValue()) ?? '',
      city: (await this.refs.state?.getValue()) ?? '',
      state: (await this.refs.state?.getValue()) ?? '',
      password: (await this.refs.password?.getValue()) ?? '',
    })

    if (response.ok) {
      authStore.authToken = response.headers.get('Authorization')
      authStore.refreshToken = response.headers.get('Refresh')
      authStore.signedIn = response.headers.get('Authorization') !== null

      toastStore.message = 'You have been signed in.'
    } else {
      toastStore.message = 'Unable to create an account.'
    }
  }
}

import { Component, ComponentInterface, Host, h } from '@stencil/core'

import authState from '../../stores/auth'
import toastState from '../../stores/toast'

interface AuthRouteProps {
  component: any
  redirect: string
  exact?: boolean
  url: string
}

const AuthRoute = ({ component, redirect, ...props }: AuthRouteProps) => {
  function routeRender(): ComponentInterface {
    if (authState.signedIn) {
      return <component />
    }
    return <stencil-router-redirect url={redirect} />
  }

  return <stencil-route {...props} routeRender={routeRender} />
}

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class Root implements ComponentInterface {
  render() {
    return (
      <Host>
        <app-navigation />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/gyms" component="app-home" />
              <AuthRoute
                url="/profile"
                component="app-profile-page"
                redirect="/signin"
              />
              <stencil-route url="/signin" component="app-sign-in-page" />
              <stencil-route url="/signup" component="app-sign-up-page" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <div
          id="snackbar"
          ref={(element?: HTMLDivElement): void => {
            toastState.snackbarRef = element
          }}
        ></div>
      </Host>
    )
  }
}

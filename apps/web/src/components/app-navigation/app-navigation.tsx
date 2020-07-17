import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'app-navigation',
  styleUrl: 'app-navigation.scss',
  shadow: true,
})
export class Navigation {
  render() {
    return (
      <Host>
        <rr-nav-bar>
          <div id="desktop-nav" class="nav-group">
            <rr-nav-link url="/">Home</rr-nav-link>
            <rr-nav-link url="/gyms">Gyms</rr-nav-link>
            <rr-nav-link url="/profile">Profile</rr-nav-link>
          </div>
          <div id="mobile-nav" class="nav-group">
            <rr-nav-link url="/">Home</rr-nav-link>
            <rr-nav-link url="/gyms">Gyms</rr-nav-link>
            <rr-nav-link url="/profile">Profile</rr-nav-link>
          </div>
        </rr-nav-bar>
      </Host>
    )
  }
}

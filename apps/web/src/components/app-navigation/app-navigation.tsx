import { Component, Host, h } from '@stencil/core'

interface NavigationLinkProps {
  url: string
  text: string
}

const NavigationLink = (props: NavigationLinkProps) => (
  <li>
    <stencil-route-link url={props.url} activeClass="active" exact={true}>
      {props.text}
    </stencil-route-link>
  </li>
)

@Component({
  tag: 'app-navigation',
  styleUrl: 'app-navigation.scss',
  shadow: true,
})
export class Navigation {
  render() {
    return (
      <Host>
        <ul>
          <div id="desktop-nav" class="nav-group">
            <NavigationLink url="/" text="Home" />
            <NavigationLink url="/gyms" text="Gyms" />
            <NavigationLink url="/profile" text="Profile" />
          </div>
          <div id="mobile-nav" class="nav-group">
            <NavigationLink url="/" text="Home" />
            <NavigationLink url="/gyms" text="Gyms" />
            <NavigationLink url="/profile" text="Profile" />
          </div>
        </ul>
      </Host>
    )
  }
}

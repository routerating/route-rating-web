import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'app-profile-page',
  styleUrl: 'app-profile-page.scss',
  shadow: true,
})
export class AppProfilePage {
  render() {
    return (
      <Host>
        <h1>Profile</h1>
      </Host>
    )
  }
}

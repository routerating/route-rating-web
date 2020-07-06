import { Component, Host, h } from '@stencil/core'

@Component({ tag: 'rr-nav-bar' })
export class RrNavBar {
  render() {
    return (
      <Host>
        <ul>
          <slot />
        </ul>
      </Host>
    )
  }
}

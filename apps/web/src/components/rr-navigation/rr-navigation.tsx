import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rr-navigation',
  styleUrl: 'rr-navigation.scss',
  shadow: true,
})
export class RrNavigation {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

import { Component, Host, Prop, h } from '@stencil/core'

@Component({ tag: 'rr-nav-link' })
export class RrNavLink {
  /**
   * The relative URL where this should link to.
   */
  @Prop() url!: string

  render() {
    return (
      <Host>
        <li>
          <stencil-route-link url={this.url} activeClass="active" exact={true}>
            <slot />
          </stencil-route-link>
        </li>
      </Host>
    )
  }
}

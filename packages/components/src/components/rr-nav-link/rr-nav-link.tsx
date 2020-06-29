import { Component, Element, Host, Prop, State, h } from '@stencil/core'

@Component({ tag: 'rr-nav-link' })
export class RrNavLink {
  /**
   * The relative URL where this should link to.
   */
  @Prop() url!: string

  /**
   * Stores the children of this select
   */
  @State() children: any[] = []

  /**
   * Stores a reference to this element.
   */
  @Element() host: HTMLRrNavLinkElement

  componentWillLoad(): void {
    this.children = Array.from(this.host.children)
  }

  render() {
    return (
      <Host>
        <li>
          <stencil-route-link url={this.url} activeClass="active" exact={true}>
            <slot />
            {this.children.map((child) => child.outerHTML)}
          </stencil-route-link>
        </li>
      </Host>
    )
  }
}

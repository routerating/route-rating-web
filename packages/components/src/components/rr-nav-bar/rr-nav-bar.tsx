import { Component, Element, Host, State, h } from '@stencil/core'

@Component({ tag: 'rr-nav-bar' })
export class RrNavBar {
  /**
   * Stores the children of this select
   */
  @State() children: any[] = []

  /**
   * Stores a reference to this element.
   */
  @Element() host: HTMLRrNavBarElement

  componentWillLoad(): void {
    this.children = Array.from(this.host.children)
  }

  render() {
    return (
      <Host>
        <ul>
          <slot />
          {this.children.map((child) => child.outerHTML)}
        </ul>
      </Host>
    )
  }
}

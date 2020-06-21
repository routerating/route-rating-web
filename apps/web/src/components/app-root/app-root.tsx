import { Component, ComponentInterface, h } from '@stencil/core'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class Root implements ComponentInterface {
  render() {
    return (
      <div>
        <app-navigation />

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/profile" component="app-profile" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    )
  }
}

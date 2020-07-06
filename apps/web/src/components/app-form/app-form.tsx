import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'app-form',
  styleUrl: 'app-form.scss',
})
export class AppForm {
  render() {
    return (
      <Host>
        <div id="form-box">
          <slot />
        </div>
      </Host>
    )
  }
}

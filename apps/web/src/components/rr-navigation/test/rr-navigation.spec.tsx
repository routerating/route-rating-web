import { newSpecPage } from '@stencil/core/testing'
import { RrNavigation } from './rr-navigation'

describe('rr-navigation', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RrNavigation],
      html: `<rr-navigation></rr-navigation>`,
    })
    expect(page.root).toEqualHtml(`
      <rr-navigation>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rr-navigation>
    `)
  })
})

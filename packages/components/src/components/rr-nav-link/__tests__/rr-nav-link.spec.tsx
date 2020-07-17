import { RrNavLink } from '../rr-nav-link'
import { newSpecPage } from '@stencil/core/testing'

describe('rr-nav-link', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [RrNavLink],
      html: `<rr-nav-link url="/some/url">Some URL<button>A random button for testing</button></rr-nav-link>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})

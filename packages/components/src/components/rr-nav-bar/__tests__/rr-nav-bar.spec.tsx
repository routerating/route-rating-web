import { RrNavBar } from '../rr-nav-bar'
import { RrNavLink } from '../../rr-nav-link/rr-nav-link'
import { newSpecPage } from '@stencil/core/testing'

describe('rr-nav-bar', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [RrNavBar, RrNavLink],
      html: `<rr-nav-bar><rr-nav-link url="asdf">URL</rr-nav-link></rr-nav-bar>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})

import { newE2EPage } from '@stencil/core/testing'

describe('rr-nav-bar', () => {
  it('should render', async () => {
    const page = await newE2EPage()
    await page.setContent('<rr-nav-bar></rr-nav-bar>')

    const element = await page.find('rr-nav-bar')
    expect(element).toHaveClass('hydrated')
  })
})

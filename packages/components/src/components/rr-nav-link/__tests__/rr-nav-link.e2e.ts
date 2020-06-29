import { newE2EPage } from '@stencil/core/testing'

describe('rr-nav-link', () => {
  it('should render', async () => {
    const page = await newE2EPage()
    await page.setContent('<rr-nav-link></rr-nav-link>')

    const element = await page.find('rr-nav-link')
    expect(element).toHaveClass('hydrated')
  })
})

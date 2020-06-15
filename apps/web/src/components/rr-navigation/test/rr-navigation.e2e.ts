import { newE2EPage } from '@stencil/core/testing'

describe('rr-navigation', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<rr-navigation></rr-navigation>')

    const element = await page.find('rr-navigation')
    expect(element).toHaveClass('hydrated')
  })
})

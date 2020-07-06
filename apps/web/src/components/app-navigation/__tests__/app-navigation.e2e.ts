import { newE2EPage } from '@stencil/core/testing'

describe('app-navigation', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<app-navigation></app-navigation>')

    const element = await page.find('app-navigation')
    expect(element).toHaveClass('hydrated')
  })
})

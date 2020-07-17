import { newE2EPage } from '@stencil/core/testing'

describe('app-sign-in-page', () => {
  it('should render', async () => {
    const page = await newE2EPage()
    await page.setContent('<app-sign-in-page></app-sign-in-page>')

    const element = await page.find('app-sign-in-page')
    expect(element).toHaveClass('hydrated')
  })
})

import { newE2EPage } from '@stencil/core/testing'

describe('app-sign-up-page', () => {
  it('should render', async () => {
    const page = await newE2EPage()
    await page.setContent('<app-sign-up-page></app-sign-up-page>')

    const element = await page.find('app-sign-up-page')
    expect(element).toHaveClass('hydrated')
  })
})

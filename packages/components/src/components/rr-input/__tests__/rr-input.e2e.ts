import { newE2EPage } from '@stencil/core/testing'

describe('rr-input', () => {
  it('should render', async () => {
    const page = await newE2EPage()
    await page.setContent('<rr-input></rr-input>')

    const element = await page.find('rr-input')
    expect(element).toHaveClass('hydrated')
  })
})

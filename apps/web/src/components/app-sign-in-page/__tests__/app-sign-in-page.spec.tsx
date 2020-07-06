import { AppSignInPage } from '../app-sign-in-page'
import { newSpecPage } from '@stencil/core/testing'

describe('app-sign-in-page', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [AppSignInPage],
      html: `<app-sign-in-page></app-sign-in-page>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

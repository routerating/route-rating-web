import { AppSignUpPage } from '../app-sign-up-page'
import { newSpecPage } from '@stencil/core/testing'

describe('app-sign-up-page', () => {
  it('should have match snapshot', async () => {
    const page = await newSpecPage({
      components: [AppSignUpPage],
      html: `<app-sign-up-page></app-sign-up-page>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

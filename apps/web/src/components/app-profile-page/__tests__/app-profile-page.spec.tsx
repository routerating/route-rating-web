import { AppProfilePage } from '../app-profile-page'
import { newSpecPage } from '@stencil/core/testing'

describe('app-profile-page', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [AppProfilePage],
      html: `<app-profile-page></app-profile-page>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

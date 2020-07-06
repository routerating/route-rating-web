import { Home } from '../app-home'
import { newSpecPage } from '@stencil/core/testing'

describe('app-home', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Home],
      html: `<app-home></app-home>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

import { Root } from '../app-root'
import { newSpecPage } from '@stencil/core/testing'

describe('app-profile', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Root],
      html: `<app-root></app-root>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

import { Navigation } from '../app-navigation'
import { newSpecPage } from '@stencil/core/testing'

describe('app-navigation', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Navigation],
      html: `<app-navigation></app-navigation>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

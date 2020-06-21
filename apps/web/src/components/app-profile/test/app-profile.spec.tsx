import { Profile } from '../app-profile'
import { newSpecPage } from '@stencil/core/testing'

describe('app-profile', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Profile],
      html: `<app-profile></app-profile>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

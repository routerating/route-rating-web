import { AppForm } from '../app-form'
import { newSpecPage } from '@stencil/core/testing'

describe('app-form', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [AppForm],
      html: `<app-form></app-form>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

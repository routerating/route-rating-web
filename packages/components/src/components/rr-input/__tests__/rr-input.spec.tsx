import { RrInput } from '../rr-input'
import { newSpecPage } from '@stencil/core/testing'

describe('rr-input', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [RrInput],
      html: `<rr-input></rr-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

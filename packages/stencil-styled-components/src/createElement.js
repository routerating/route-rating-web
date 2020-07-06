import { ThemeContext } from './createProvider'
import generateAlphabeticName from './utils/generateAlphabeticName'
import { h } from '@stencil/core'
import hash from './utils/hash'
import { injectStyles } from './injectStyles'

let counter = 0
export default (Tag) => (strings, ...values) => {
  return (props, children) => {
    // generate a unique component ID
    counter++
    const componentId = 'ssc-' + generateAlphabeticName(hash('ssc' + counter))

    // consume and generate styles
    return h(ThemeContext.Consumer, {}, (theme) => {
      // inject styles into stylesheet
      injectStyles(componentId, strings, { ...props, theme }, values)

      return h(
        Tag,
        {
          ...props,
          class: [props.class, componentId].filter((x) => !!x).join(' '),
          ref: props && props.ref,
        },
        children
      )
    })
  }
}

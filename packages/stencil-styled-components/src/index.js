import { ThemeContext } from './createProvider'
import createElement from './createElement'
import domElements from './utils/domElements'

// styled custom components
function styled(el) {
  return createElement(el)
}

for (const tag of domElements) {
  styled[tag] = createElement(tag)
}

export const ThemeProvider = ThemeContext.Provider

export default styled

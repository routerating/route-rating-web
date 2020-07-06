export { Components } from './components'

enum Classes {
  RR_INPUT_LABEL = 'rr-input-label',
  RR_INPUT = 'rr-input',
}

export const rr = {
  Classes,
}

export interface HTMLTarget extends EventTarget {
  value?: string
  id?: string
}

export interface HTMLEvent extends Event {
  target: HTMLTarget | null
}

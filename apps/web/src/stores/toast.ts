import { createStore } from '@stencil/store'

export interface ToastState {
  message: string
  snackbarRef?: HTMLDivElement
}

const { state, onChange } = createStore<ToastState>({ message: '' })

onChange('message', (value) => {
  const { snackbarRef } = state

  if (value !== '' && snackbarRef) {
    snackbarRef.innerText = value
    snackbarRef.classList.add('show')

    setTimeout(() => {
      state.message = ''
      snackbarRef.classList.remove('show')
    }, 3000)
  }
})

export default state

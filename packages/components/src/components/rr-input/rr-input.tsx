import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core'
import { HTMLEvent, rr } from '../..'

@Component({ tag: 'rr-input' })
export class RrInput {
  /**
   * The label for the input.
   */
  @Prop() label: string

  /**
   * The type of the input.
   */
  @Prop() type: string

  /**
   * The allowed patterns for the input.
   */
  @Prop() pattern: string

  /**
   * Whether the input is required.
   */
  @Prop() required: boolean

  /**
   * The minimum date an input can be.
   */
  @Prop() min: string = new Date().toLocaleDateString()

  /**
   * The value of the input.
   */
  @State() value: string

  /**
   * Stores the name of the input element.
   */
  @Prop() name: string

  /**
   * Stores the autocomplete value of the input element.
   */
  @Prop() autocomplete: string

  /**
   * A reference to the host element.
   */
  @Element() host: HTMLRrInputElement

  /**
   * Tracks changes to the value field of the input
   */
  @Event() rrInputValueChanged: EventEmitter<HTMLRrInputElement>

  /**
   * Runs whenever the value state is changed.
   */
  @Watch('value')
  async valueWatch(): Promise<void> {
    this.rrInputValueChanged.emit(this.host)
  }

  /**
   * Returns the value of the input.
   */
  @Method()
  async getValue(): Promise<string | undefined> {
    return this.value
  }

  /**
   * Sets the value of the input.
   */
  @Method()
  async setValue(value: string): Promise<void> {
    this.value = value
  }

  render() {
    return (
      <Host>
        <label
          class={rr.Classes.RR_INPUT_LABEL}
          htmlFor={`${this.host.id}-input`}
          id={`${this.host.id}-input-label`}
        >
          {this.label}
        </label>
        <input
          id={`${this.host.id}-input`}
          autocomplete={this.autocomplete}
          class={rr.Classes.RR_INPUT}
          name={this.name}
          onInput={this.handleChange}
          pattern={this.pattern}
          required={this.required}
          type={this.type}
          value={this.value}
        />
      </Host>
    )
  }

  /**
   * Updates the value of this.value when the input is changed.
   * @param event The select event.
   */
  private handleChange = async (event: HTMLEvent): Promise<void> => {
    if (event?.target?.value) {
      this.value = event.target.value
    }
  }
}

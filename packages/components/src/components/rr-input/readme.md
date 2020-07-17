# rr-input

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                         | Type      | Default                           |
| -------------- | -------------- | --------------------------------------------------- | --------- | --------------------------------- |
| `autocomplete` | `autocomplete` | Stores the autocomplete value of the input element. | `string`  | `undefined`                       |
| `label`        | `label`        | The label for the input.                            | `string`  | `undefined`                       |
| `min`          | `min`          | The minimum date an input can be.                   | `string`  | `new Date().toLocaleDateString()` |
| `name`         | `name`         | Stores the name of the input element.               | `string`  | `undefined`                       |
| `pattern`      | `pattern`      | The allowed patterns for the input.                 | `string`  | `undefined`                       |
| `required`     | `required`     | Whether the input is required.                      | `boolean` | `undefined`                       |
| `type`         | `type`         | The type of the input.                              | `string`  | `undefined`                       |


## Events

| Event                 | Description                                    | Type                              |
| --------------------- | ---------------------------------------------- | --------------------------------- |
| `rrInputValueChanged` | Tracks changes to the value field of the input | `CustomEvent<HTMLRrInputElement>` |


## Methods

### `getValue() => Promise<string | undefined>`

Returns the value of the input.

#### Returns

Type: `Promise<string | undefined>`



### `setValue(value: string) => Promise<void>`

Sets the value of the input.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

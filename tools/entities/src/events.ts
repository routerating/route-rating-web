import React from 'react';

export type ButtonEvent = React.SyntheticEvent<HTMLButtonElement>;

export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export type ElementEvent = React.SyntheticEvent<HTMLElement>;

export type HandlerReturn = Promise<void> | void;

export type KeyboardEvent = React.KeyboardEvent<HTMLElement>;

export type FormEvent = React.FormEvent<HTMLFormElement>;

export type SelectChangeEvent = React.ChangeEvent<{
  name?: string;
  value: unknown;
}>;

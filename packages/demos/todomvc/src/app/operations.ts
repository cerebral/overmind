import { Map, Do } from '../app'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const getEventValue: Map<ChangeEvent, string> = (_, event) =>
  event.currentTarget.value

export const preventEventDefault: Do<React.FormEvent> = (_, event) =>
  event.preventDefault()

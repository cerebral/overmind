import { Operation } from 'overmind'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const getEventValue: Operation.Map<ChangeEvent, string> = (_, event) =>
  event.currentTarget.value

export const preventEventDefault: Operation.Do<React.FormEvent> = (_, event) =>
  event.preventDefault()

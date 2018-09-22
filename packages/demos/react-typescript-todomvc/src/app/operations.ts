import { Operation } from 'overmind'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const getEventValue: Operation.Map<ChangeEvent, string> = (_, event) =>
  event.currentTarget.value

export const preventEventDefault: Operation.Run<React.FormEvent> = (_, event) =>
  event.preventDefault()

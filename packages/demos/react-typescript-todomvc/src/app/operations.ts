import { Operation } from 'overmind'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const getEventValue: Operation.Map<ChangeEvent, string> = ({
  value: event,
}) => event.currentTarget.value

export const preventEventDefault: Operation.Run<React.FormEvent> = ({
  value: event,
}) => event.preventDefault()

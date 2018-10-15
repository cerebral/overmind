import { Map, Run } from './'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const getEventValue: Map<ChangeEvent, string> = ({ value: event }) =>
  event.currentTarget.value

export const preventEventDefault: Run<React.FormEvent> = ({ value: event }) =>
  event.preventDefault()

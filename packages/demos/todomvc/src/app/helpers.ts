export const getEventValue = (_, event: React.ChangeEvent<HTMLInputElement>) =>
  event.currentTarget.value

export const preventEventDefault = (_, event: React.FormEvent) =>
  event.preventDefault()

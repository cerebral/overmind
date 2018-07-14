export const getEventValue = (event: React.ChangeEvent<HTMLInputElement>) =>
  event.currentTarget.value

export const preventEventDefault = (event: React.FormEvent) =>
  event.preventDefault()

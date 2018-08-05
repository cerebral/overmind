export function getEventValue(_, event: React.ChangeEvent<HTMLInputElement>) {
  return Promise.resolve(event.currentTarget.value)
}

export function preventEventDefault(_, event: React.FormEvent) {
  event.preventDefault()
}

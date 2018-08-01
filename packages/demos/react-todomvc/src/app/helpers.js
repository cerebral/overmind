export function getEventValue(_, event) {
  return Promise.resolve(event.currentTarget.value)
}

export function preventEventDefault(_, event) {
  event.preventDefault()
}

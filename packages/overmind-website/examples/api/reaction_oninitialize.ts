export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = ({ effects }, instance) => {
  instance.reaction(
    ({ todos }) => todos,
    (todos) => effects.storage.saveTodos(todos),
    {
      nested: true
    }
  )
}
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
export const onInitialize = ({ effects }, instance) => {
  instance.reaction(
    ({ todos }) => todos,
    (todos) => effects.storage.saveTodos(todos),
    {
      nested: true
    }
  )
}
  `,
        },
      ]

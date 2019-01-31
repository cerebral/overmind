import { createOvermindMock, IAction } from './'

type State = {
  foo: string
  upperFoo: string
}

describe('Mock', () => {
  test('should run action tests', () => {
    type State = {
      foo: string
    }
    const state: State = {
      foo: 'bar',
    }
    const test: Action = ({ state, effects, actions }) => {
      state.foo = effects.effect()
    }
    const actions = { test }
    const effect = () => 'bar2'
    const effects = { effect }
    const config = {
      state,
      actions,
      effects,
    }

    type Config = typeof config

    interface Action<Input = void> extends IAction<Config, Input> {}

    const overmind = createOvermindMock(config, {
      effect() {
        return 'bar3'
      },
    })

    return overmind.actions.test().then((result) =>
      expect(result).toEqual([
        {
          method: 'set',
          path: 'foo',
          args: ['bar3'],
        },
      ])
    )
  })
})

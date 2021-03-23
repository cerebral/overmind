import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/svelte'

import { Overmind } from 'overmind'

import { createMixin } from './'
import CountTest from './CountTest.svelte'

const app = {
  state: {
    count: 0,
  },
  actions: {
    increase({ state }) {
      state.count++
    },
    decrease({ state }) {
      state.count--
    },
  },
}

describe('Svelte', () => {
  test('should create mixin', () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)

    expect('state' in mixin)
  })

  test('should expose subscribe', () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)

    expect(typeof mixin.state.subscribe === 'function')
  })

  test('should display current state', () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)

    const { getByText } = render(CountTest, { store: mixin })
    expect(getByText('Count: 0')).toBeInTheDocument()
  })

  test('should update state by button click', async () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)

    const { getAllByRole } = render(CountTest, { store: mixin })
    const [increaseBtn] = getAllByRole('button')

    await fireEvent.click(increaseBtn)
    await fireEvent.click(increaseBtn)

    expect(mixin.state.count === 2)
  })

  test('should update view on state change', async () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)

    const { getByText, getAllByRole } = render(CountTest, { store: mixin })
    const [increaseBtn] = getAllByRole('button')

    await fireEvent.click(increaseBtn)

    expect(getByText('Count: 1')).toBeInTheDocument()
  })

  test('should update view on reaction', async () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)

    const { getByText, getAllByRole } = render(CountTest, { store: mixin })
    const [increaseBtn] = getAllByRole('button')

    expect(getByText('Doubled: 0')).toBeInTheDocument()

    await fireEvent.click(increaseBtn)
    await fireEvent.click(increaseBtn)

    expect(getByText('Doubled: 4')).toBeInTheDocument()
  })
})

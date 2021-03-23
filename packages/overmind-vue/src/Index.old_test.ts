/*
import { Overmind } from 'overmind'
import { h } from 'vue'
import { createConnect } from './'
import { render, fireEvent } from '@testing-library/vue'

  
describe('Vue', () => {
  it('should mount with connected app', async () => {
    const app = new Overmind({
      state: {
        foo: 'bar',
      },
    })
    const connect = createConnect(app)
     // The render method returns a collection of utilities to query your component.
  const { getByText } = render(connect({
    setup() {
      return () => h('div', {}, this.overmind.state.foo)
    }
  }))

  getByText('bar')
  })

  it('should mount with custom connected app', () => {
    const app = new Overmind({
      state: {
        foo: 'bar',
      },
    })
    const connect = createConnect(app)
    const vm = new Vue(
      connect(
        ({ state }) => ({
          state,
        }),
        {
          el: dom.window.document.createElement('div'),
        }
      )
    )
    expect(vm.state.foo).toBe('bar')
  })
  it('should expose actions', (done) => {
    const app = new Overmind({
      state: {
        foo: 'bar',
      },
      actions: {
        changeFoo: ({ state }) => (state.foo = 'bar2'),
      },
    })
    const connect = createConnect(app)
    const instance = new Vue(
      connect({
        el: dom.window.document.createElement('div'),
      })
    )
    expect(instance.overmind.state.foo).toBe('bar')
    Vue.nextTick(() => {
      instance.overmind.actions.changeFoo()
      expect(instance.overmind.state.foo).toBe('bar2')
      done()
    })
  })

})

  */

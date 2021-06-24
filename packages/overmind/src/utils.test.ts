import { deepCopy, getChangeMutations } from './utils'

describe('deepCopy', () => {
  test('should be able to preserve getters', () => {
    expect.assertions(1)
    const original = {
      value: 0,
      get valuePlusTwo() {
        return this.value + 2
      },
    }
    const copy = deepCopy(original)
    copy.value = 15
    expect(copy.valuePlusTwo).toBe(17)
  })
})

describe('getChangeMutations', () => {
  test('should be able to create a set mutation when value has changed', () => {
    const stateA = {
      foo: 'bar',
    }
    const stateB = {
      foo: 'bar2',
    }
    const mutations = getChangeMutations(stateA, stateB)
    expect(mutations[0].path).toBe('foo')
    expect(mutations[0].args[0]).toBe('bar2')
  })
  test('should be able to create a set mutation when nested value has changed', () => {
    const stateA = {
      foo: {
        bar: {
          baz: 'mip',
        },
      },
    }
    const stateB = {
      foo: {
        bar: {
          baz: 'mip2',
        },
      },
    }
    const mutations = getChangeMutations(stateA, stateB)
    expect(mutations.length).toBe(1)
    expect(mutations[0].path).toBe('foo.bar.baz')
    expect(mutations[0].args[0]).toBe('mip2')
  })
  test('should be able to create an unset mutation when key is not there anymore', () => {
    const stateA = {
      foo: {
        bar: {
          baz: 'mip',
        },
      },
    }
    const stateB = {
      foo: {
        bar: {},
      },
    }
    const mutations = getChangeMutations(stateA, stateB)
    expect(mutations.length).toBe(1)
    expect(mutations[0].path).toBe('foo.bar.baz')
    expect(mutations[0].method).toBe('unset')
  })
})

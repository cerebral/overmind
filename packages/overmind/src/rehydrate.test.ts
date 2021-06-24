import { SERIALIZE, rehydrate } from './'

describe('REHYDRATE', () => {
  test('should allow rehydration', () => {
    expect.assertions(1)
    const state = {
      foo: 'bar',
    }
    rehydrate(state, {
      foo: 'bar2',
    })

    expect(state).toEqual({
      foo: 'bar2',
    })
  })
  test('should allow rehydration by mutations', () => {
    expect.assertions(1)
    const state = {
      foo: 'bar',
    }
    rehydrate(state, [
      {
        method: 'set',
        args: ['bar2'],
        hasChangedValue: false,
        path: 'foo',
        revert: () => {},
      },
    ])

    expect(state).toEqual({
      foo: 'bar2',
    })
  })
  test.only('should allow rehydration of single class value', () => {
    expect.assertions(1)
    class User {
      name = 'Bob'
      toJSON() {
        return {
          [SERIALIZE]: true,
          name: this.name,
        }
      }

      static fromJSON(json) {
        return Object.assign(new User(), json)
      }
    }
    type State = {
      user: User | null
      user2: User
    }
    const state: State = {
      user: null,
      user2: new User(),
    }
    rehydrate(
      state,
      {
        user: {
          name: 'Bob2',
        },
        user2: {
          name: 'Bob2',
        },
      },
      {
        user: User.fromJSON,
        user2: User.fromJSON,
      }
    )

    expect(state).toEqual({
      user: {
        name: 'Bob2',
      },
      user2: {
        name: 'Bob2',
      },
    })
  })
  test('should allow rehydration of array', () => {
    expect.assertions(2)
    class User {
      [SERIALIZE]
      name = 'Bob'
      static fromJSON(json) {
        return Object.assign(new User(), json)
      }
    }
    type State = {
      users: User[]
    }
    const state: State = {
      users: [],
    }
    rehydrate(
      state,
      {
        users: [
          {
            name: 'Bob2',
          },
          {
            name: 'Bob3',
          },
        ],
      },
      {
        users: User.fromJSON,
      }
    )

    expect(state.users[0]).toBeInstanceOf(User)
    expect(state.users[1]).toBeInstanceOf(User)
  })
  test('should allow rehydration of dictionary', () => {
    expect.assertions(2)
    class User {
      [SERIALIZE]
      name = 'Bob'
      static fromJSON(json) {
        return Object.assign(new User(), json)
      }
    }
    type State = {
      users: { [key: string]: User }
    }
    const state: State = {
      users: {},
    }
    rehydrate(
      state,
      {
        users: {
          id1: {
            name: 'Bob2',
          },
          id2: {
            name: 'Bob3',
          },
        },
      },
      {
        users: User.fromJSON,
      }
    )

    expect(state.users.id1).toBeInstanceOf(User)
    expect(state.users.id2).toBeInstanceOf(User)
  })
})

import { IS_PROXY, ProxyStateTree } from './'

describe('CREATION', () => {
  test('should create a ProxyStateTree instance', () => {
    const tree = new ProxyStateTree({})

    expect(tree).toBeInstanceOf(ProxyStateTree)
  })
})
describe('TrackStateTree', () => {
  test('should create proxy of root state', () => {
    const state = {}
    const tree = new ProxyStateTree(state)

    expect(
      tree.getTrackStateTree().track(() => {}).state[IS_PROXY]
    ).toBeTruthy()
  })
  test('should not cache proxies in SSR', () => {
    const state = {
      foo: {},
    }
    const tree = new ProxyStateTree(state, {
      ssr: true,
    })

    const trackStateTree = tree.getTrackStateTree()
    trackStateTree.track(() => {
      trackStateTree.state.foo
    })

    expect(
      // @ts-ignore
      trackStateTree.state.foo[trackStateTree.proxifier.CACHED_PROXY]
    ).toBeFalsy()
  })

  test('should not create nested proxies when initialized', () => {
    const state = {
      foo: {},
    }
    new ProxyStateTree(state) // eslint-disable-line

    expect(state.foo[IS_PROXY]).not.toBeTruthy()
  })
  test('should allow tracking by flush', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      foo: 'bar',
    })

    const accessTree = tree
      .getTrackStateTree()
      .track((mutations, paths, flushId) => {
        reactionCount++
        expect(flushId).toBe(0)
      })

    accessTree.state.foo

    const mutationTree = tree.getMutationTree()

    mutationTree.state.foo = 'bar2'

    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })
  test('should allow tracking by mutation', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      foo: 'bar',
    })

    tree.onMutation((mutation) => {
      reactionCount++
      expect(mutation).toEqual({
        method: 'set',
        path: 'foo',
        args: ['bar2'],
        hasChangedValue: true,
        delimiter: '.',
      })
    })

    const mutationTree = tree.getMutationTree()

    mutationTree.state.foo = 'bar2'

    expect(reactionCount).toBe(1)
  })
  test('should stop tracking on command', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      foo: 'bar',
      bar: 'baz',
    })

    const accessTree = tree
      .getTrackStateTree()
      .track((mutations, paths, flushId) => {
        reactionCount++
        expect(flushId).toBe(0)
      })

    accessTree.state.foo

    accessTree.stopTracking()

    accessTree.state.bar

    const mutationTree = tree.getMutationTree()

    mutationTree.state.foo = 'bar2'
    mutationTree.flush()
    mutationTree.state.bar = 'baz2'
    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })
  test('should allow tracking trees individually', () => {
    const tree = new ProxyStateTree({
      foo: 'bar',
      bar: 'baz',
    })

    const accessTreeA = tree.getTrackStateTreeWithProxifier()
    const accessTreeB = tree.getTrackStateTreeWithProxifier()

    accessTreeA.track(() => {})
    accessTreeB.track(() => {})

    accessTreeA.state.foo
    accessTreeB.state.bar

    return Promise.resolve().then(() => {
      accessTreeB.state.foo

      expect(Array.from(accessTreeA.pathDependencies)).toEqual(['foo'])
      expect(Array.from(accessTreeB.pathDependencies)).toEqual(['bar', 'foo'])
    })
  })
  test('should track native classes', () => {
    const tree = new ProxyStateTree({ date: new Date(), map: new Map() })
    const trackStateTree = tree.getTrackStateTree()
    trackStateTree.track()

    trackStateTree.state.date
    trackStateTree.state.map

    expect(Array.from(trackStateTree.pathDependencies)).toEqual(['date', 'map'])
  })
})
describe('TrackMutationTree', () => {})

describe('CLASSES', () => {
  describe('ACCESS', () => {
    test('should create proxy when accessed', () => {
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      const trackStateTree = tree.getTrackStateTree().track(() => {})

      expect(trackStateTree.state.user[IS_PROXY]).toBeTruthy()
    })

    test('should access properties', () => {
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      expect(tree.getTrackStateTree().track(() => {}).state.user.name).toBe(
        'Bob'
      )
    })

    test('should track access properties', () => {
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      const trackStateTree = tree.getTrackStateTree().track(() => {})

      expect(trackStateTree.state.user.name).toBe('Bob')

      expect(Object.keys((tree as any).pathDependencies)).toEqual([
        'user',
        'user.name',
      ])
    })

    test('should track getters', () => {
      class User {
        private firstName = 'Bob'
        private lastName = 'Saget'
        get name() {
          return this.firstName + ' ' + this.lastName
        }
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      const trackStateTree = tree.getTrackStateTree().track(() => {})

      expect(trackStateTree.state.user.name).toBe('Bob Saget')

      expect(Object.keys((tree as any).pathDependencies)).toEqual([
        'user',
        'user.firstName',
        'user.lastName',
      ])
    })
  })
  describe('MUTATIONS', () => {
    test('should throw when mutating without tracking', () => {
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      expect(() => {
        tree.getTrackStateTree().track(() => {}).state.user.name = 'bar2'
      }).toThrow()
    })

    test('should throw if parts of state are nested', () => {
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      expect(() => {
        const mutationTree = tree.getMutationTree()
        mutationTree.state.user = mutationTree.state.user // eslint-disable-line
      }).toThrowError(/exists in the state tree on path "user"/i)
    })
    test('should not notify changes to same value', () => {
      let renderCount = 0
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      const accessTree = tree.getTrackStateTree().track(() => {
        renderCount++
      })
      accessTree.addTrackingPath('user.name')
      mutationTree.state.user.name = 'bar'
      expect(mutationTree.mutations).toEqual([
        {
          method: 'set',
          path: 'user.name',
          args: ['bar'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])
      expect(renderCount).toBe(0)
    })
    test('should track SET mutations', () => {
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      mutationTree.state.user.name = 'bar2'
      expect(mutationTree.mutations).toEqual([
        {
          method: 'set',
          path: 'user.name',
          args: ['bar2'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])
      expect(mutationTree.state.user.name).toBe('bar2')
    })
    test('should allow custom delimiter', () => {
      class User {
        name = 'Bob'
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state, {
        delimiter: ' ',
      })
      const mutationTree = tree.getMutationTree()
      mutationTree.state.user.name = 'bar2'
      expect(mutationTree.mutations).toEqual([
        {
          method: 'set',
          path: 'user name',
          args: ['bar2'],
          hasChangedValue: true,
          delimiter: ' ',
        },
      ])
      expect(mutationTree.state.user.name).toBe('bar2')
    })
    test('should track mutations through methods', () => {
      class User {
        name = 'Bob'
        changeName() {
          this.name = 'Bob2'
        }
      }
      const state = {
        user: new User(),
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()

      mutationTree.state.user.changeName()

      expect(mutationTree.mutations).toEqual([
        {
          method: 'set',
          path: 'user.name',
          args: ['Bob2'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])
      expect(mutationTree.state.user.name).toBe('Bob2')
    })
  })
})

describe('OBJECTS', () => {
  describe('ACCESS', () => {
    test('should create proxy when accessed', () => {
      const state = {
        foo: {},
      }
      const tree = new ProxyStateTree(state)
      const trackStateTree = tree.getTrackStateTree().track(() => {})

      expect(trackStateTree.state.foo[IS_PROXY]).toBeTruthy()
    })

    test('should access properties', () => {
      const state = {
        foo: {
          bar: 'baz',
        },
      }
      const tree = new ProxyStateTree(state)
      expect(tree.getTrackStateTree().track(() => {}).state.foo.bar).toBe('baz')
    })

    test('should track access properties', () => {
      const state = {
        foo: {
          bar: 'baz',
        },
      }
      const tree = new ProxyStateTree(state)
      const trackStateTree = tree.getTrackStateTree().track(() => {})

      expect(trackStateTree.state.foo.bar).toBe('baz')

      expect(Object.keys((tree as any).pathDependencies)).toEqual([
        'foo',
        'foo.bar',
      ])
    })
  })

  describe('MUTATIONS', () => {
    test('should throw when mutating without tracking', () => {
      const state = {
        foo: 'bar',
      }
      const tree = new ProxyStateTree(state)
      expect(() => {
        tree.getTrackStateTree().track(() => {}).state.foo = 'bar2'
      }).toThrow()
    })

    test('should throw if parts of state are nested', () => {
      const state = {
        foo: {
          nested: 'bar',
        },
      }
      const tree = new ProxyStateTree(state)
      expect(() => {
        const mutationTree = tree.getMutationTree()
        mutationTree.state.foo = mutationTree.state.foo // eslint-disable-line
      }).toThrowError(/exists in the state tree on path "foo"/i)
    })
    test('should not notify changes to same value', () => {
      let renderCount = 0
      const state = {
        foo: 'bar',
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      const accessTree = tree.getTrackStateTree().track(() => {
        renderCount++
      })
      accessTree.addTrackingPath('foo')
      mutationTree.state.foo = 'bar'
      expect(mutationTree.mutations).toEqual([
        {
          method: 'set',
          path: 'foo',
          args: ['bar'],
          hasChangedValue: false,
          delimiter: '.',
        },
      ])
      expect(renderCount).toBe(0)
    })
    test('should track SET mutations', () => {
      const state = {
        foo: 'bar',
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      mutationTree.state.foo = 'bar2'
      expect(mutationTree.mutations).toEqual([
        {
          method: 'set',
          path: 'foo',
          args: ['bar2'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])
      expect(mutationTree.state.foo).toBe('bar2')
    })
    test('should track UNSET mutations', () => {
      const state = {
        foo: 'bar',
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()

      delete mutationTree.state.foo

      expect(mutationTree.mutations).toEqual([
        {
          method: 'unset',
          path: 'foo',
          args: [],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])
      expect(mutationTree.state.foo).toBe(undefined)
    })
  })
})

describe('ARRAYS', () => {
  describe('ACCESS', () => {
    test('should create proxies of arrays', () => {
      const state = {
        foo: [],
      }
      const tree = new ProxyStateTree(state)
      const trackStateTree = tree.getTrackStateTree().track(() => {})
      const foo = trackStateTree.state.foo

      expect(foo[IS_PROXY]).toBeTruthy()
    })

    test('should access properties', () => {
      const state = {
        foo: 'bar',
      }
      const tree = new ProxyStateTree(state)
      expect(tree.getTrackStateTree().track(() => {}).state.foo[0]).toBe('b')
    })

    test('should track access properties', () => {
      const state = {
        foo: ['bar'],
      }
      const tree = new ProxyStateTree(state)
      const accessTree = tree.getTrackStateTree().track(() => {})
      expect(accessTree.state.foo[0]).toBe('bar')
      expect(Object.keys((tree as any).pathDependencies)).toEqual([
        'foo',
        'foo.0',
      ])
    })

    test('should allow nested tracking', () => {
      const tree = new ProxyStateTree({
        foo: [
          {
            title: 'foo',
          },
        ],
        bar: 'baz',
      })

      tree.getTrackStateTree().trackScope(
        (treeA) => {
          treeA.state.foo.forEach((item) => {
            tree.getTrackStateTree().trackScope(
              (treeB) => {
                item.title // eslint-disable-line
                expect(treeB.pathDependencies).toEqual(new Set(['foo.0.title']))
              },
              () => {}
            )
          })
          treeA.state.bar
          expect(treeA.pathDependencies).toEqual(
            new Set(['foo', 'foo.0', 'bar'])
          )
        },
        () => {}
      )
    })
    test('should correctly keep track of changing indexes', () => {
      expect.assertions(4)
      let iterations = 0
      const tree = new ProxyStateTree({
        items: [],
      })

      const accessTree = tree.getTrackStateTree()

      function trackPaths() {
        accessTree.track(trackPaths)
        accessTree.state.items.map((item) => item.title)

        if (iterations === 1) {
          expect(Array.from(accessTree.pathDependencies)).toEqual([
            'items',
            'items.0',
            'items.0.title',
          ])
        } else if (iterations === 2) {
          expect(Array.from(accessTree.pathDependencies)).toEqual([
            'items',
            'items.0',
            'items.0.title',
            'items.1',
            'items.1.title',
          ])
        } else if (iterations === 3) {
          expect(Array.from(accessTree.pathDependencies)).toEqual([
            'items',
            'items.0',
            'items.0.title',
            'items.1',
            'items.1.title',
          ])
        }

        iterations++
      }

      trackPaths()
      const mutationTree = tree.getMutationTree()
      mutationTree.state.items.unshift({
        title: 'foo',
      })
      const currentProxy = mutationTree.state.items[0]
      mutationTree.flush()

      mutationTree.state.items.unshift({
        title: 'bar',
      })

      mutationTree.flush()
      mutationTree.state.items[1].title = 'wapah'
      const newProxy = mutationTree.state.items[1]
      mutationTree.flush()
      expect(currentProxy).not.toBe(newProxy)
    })
  })

  test('should create proxies of arrays', () => {
    const state = {
      foo: [],
    }
    const tree = new ProxyStateTree(state)
    const trackStateTree = tree.getTrackStateTree().track(() => {})
    const foo = trackStateTree.state.foo

    expect(foo[IS_PROXY]).toBeTruthy()
  })

  describe('MUTATIONS', () => {
    test('should throw when mutating without tracking mutations', () => {
      const state = {
        foo: [],
      }
      const tree = new ProxyStateTree(state)
      expect(() => {
        tree.getTrackStateTree().state.foo.push('foo')
      }).toThrow()
    })

    test('should throw if parts of state are nested', () => {
      const state = {
        foo: [undefined],
        bar: {
          nested: 'baz',
        },
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()

      // Property mutation
      expect(() => {
        mutationTree.state.foo[0] = mutationTree.state.bar
      }).toThrowError(/exists in the state tree on path "bar"/i)
    })

    test('should track PUSH mutations', () => {
      const state = {
        foo: [],
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      mutationTree.state.foo.push('bar')
      expect(mutationTree.mutations).toEqual([
        {
          method: 'push',
          path: 'foo',
          args: ['bar'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])

      expect([...mutationTree.state.foo]).toEqual(['bar'])
    })

    test('should track POP mutations', () => {
      const state = {
        foo: ['foo'],
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      mutationTree.state.foo.pop()
      expect(mutationTree.mutations).toEqual([
        {
          method: 'pop',
          path: 'foo',
          args: [],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])

      expect(state.foo.length).toBe(0)
    })

    test('should track SHIFT mutations', () => {
      const state = {
        foo: ['foo'],
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      mutationTree.state.foo.shift()

      expect(mutationTree.mutations).toEqual([
        {
          method: 'shift',
          path: 'foo',
          args: [],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])

      expect(state.foo.length).toBe(0)
    })
    test('should track UNSHIFT mutations', () => {
      const state = {
        foo: [],
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      mutationTree.state.foo.unshift('foo')

      expect(mutationTree.mutations).toEqual([
        {
          method: 'unshift',
          path: 'foo',
          args: ['foo'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])

      expect(state.foo[0]).toBe('foo')
    })
    test('should track SPLICE mutations', () => {
      const state = {
        foo: ['foo'],
      }
      const tree = new ProxyStateTree(state)
      const mutationTree = tree.getMutationTree()
      mutationTree.state.foo.splice(0, 1, 'bar')

      expect(mutationTree.mutations).toEqual([
        {
          method: 'splice',
          path: 'foo',
          args: [0, 1, 'bar'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ])

      expect(state.foo[0]).toBe('bar')
    })
  })

  test('should allow indexOf using proxy values', () => {
    const state = {
      things: [{ some: 'thing' }],
      ids: [2, 1, 1, 1, 2],
    }
    const tree = new ProxyStateTree(state)
    expect(tree.state.things.indexOf(tree.state.things[0])).toEqual(0)
    expect(tree.state.ids.indexOf(2)).toEqual(0)
    expect(tree.state.ids.indexOf(2, 1)).toEqual(4)
  })
})

describe('FUNCTIONS', () => {
  test('should call functions in the tree when accessed', () => {
    const state = {
      foo: () => 'bar',
    }
    const tree = new ProxyStateTree(state)
    const accessTree = tree.getTrackStateTree().track(() => {})
    expect(accessTree.state.foo).toBe('bar')
  })

  test('should pass proxy-state-tree instance and path', () => {
    const state = {
      foo: (proxyStateTree, path) => {
        expect(proxyStateTree === tree)
        expect(path).toEqual('foo')

        return 'bar'
      },
    }
    const tree = new ProxyStateTree(state)
    const accessTree = tree.getTrackStateTree().track(() => {})

    expect(accessTree.state.foo).toBe('bar')
  })

  test('should be able to inject a wrapper around functions', () => {
    const state = {
      foo: (foo, proxyStateTree, path) => {
        expect(foo).toBe('foo')
        expect(proxyStateTree === tree)
        expect(path).toEqual('foo')

        return 'bar'
      },
    }
    const tree = new ProxyStateTree(state, {
      onGetFunction: (proxyStateTree, path, target, prop) =>
        target[prop]('foo', proxyStateTree, path),
    })

    const accessTree = tree.getTrackStateTree().track(() => {})

    expect(accessTree.state.foo).toBe('bar')
  })

  test('should track state values from within derived', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      items: [
        {
          title: 'foo',
        },
      ],
      foo: (proxyStateTree) => {
        return proxyStateTree.state.items.map((item) => item)
      },
    })
    const accessTree = tree
      .getTrackStateTree()
      .track((mutations, paths, flushId) => {
        reactionCount++
        expect(flushId).toBe(0)
      })
    const mutationTree = tree.getMutationTree()

    // @ts-ignore
    accessTree.state.foo.forEach((item) => {
      item.title
    })

    mutationTree.state.items.push({
      title: 'bar',
    })
    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })
})

describe('REACTIONS', () => {
  test('should be able to register a listener using paths', () => {
    expect.assertions(2)
    let reactionCount = 0
    const tree = new ProxyStateTree({
      foo: 'bar',
    })
    const accessTree = tree
      .getTrackStateTree()
      .track((mutations, paths, flushId) => {
        reactionCount++
        expect(flushId).toBe(0)
      })
    const mutationTree = tree.getMutationTree()
    accessTree.state.foo // eslint-disable-line

    mutationTree.state.foo = 'bar2'
    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })

  test('should be able to register a global listener', () => {
    expect.assertions(1)
    const tree = new ProxyStateTree({
      foo: 'bar',
    })
    const mutationTree = tree.getMutationTree()

    tree.onMutation((mutation) => {
      expect(mutation).toEqual({
        method: 'set',
        path: 'foo',
        args: ['bar2'],
        hasChangedValue: true,
        delimiter: '.',
      })
    })

    mutationTree.state.foo = 'bar2'
    mutationTree.flush()
  })

  test('should be able to manually add a path to the current tracking', () => {
    let renderCount = 0
    const tree = new ProxyStateTree({
      foo: 'bar',
    })

    function render() {
      renderCount++
    }

    const mutationTree = tree.getMutationTree()
    const accessTree = tree.getTrackStateTree().track(render)
    accessTree.addTrackingPath('foo')
    mutationTree.state.foo = 'bar2'
    mutationTree.flush()
    expect(renderCount).toBe(1)
  })

  test('should only trigger ones when multiple paths mutated', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      foo: 'bar',
      bar: 'baz',
    })
    const accessTree = tree.getTrackStateTree().track(() => {
      reactionCount++
    })
    const mutationTree = tree.getMutationTree()

    accessTree.state.foo // eslint-disable-line
    accessTree.state.bar // eslint-disable-line

    mutationTree.state.foo = 'bar2'
    mutationTree.state.bar = 'baz2'

    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })

  test('should be able to update listener using paths', () => {
    const tree = new ProxyStateTree({
      foo: 'bar',
      bar: 'baz',
    })
    const accessTree = tree.getTrackStateTree().track(render)
    const mutationTree = tree.getMutationTree()
    function render() {
      if (accessTree.state.foo === 'bar') {
        return
      }

      accessTree.state.bar // eslint-disable-line
    }

    render()
    mutationTree.state.foo = 'bar2'
    mutationTree.flush()
    expect((tree.pathDependencies as any).foo.size).toBe(1)
    expect((tree.pathDependencies as any).bar.size).toBe(1)
  })

  test('should be able to dispose tree', () => {
    const tree = new ProxyStateTree({
      foo: 'bar',
      bar: 'baz',
    })
    const accessTree = tree.getTrackStateTree().track(render)
    const mutationTree = tree.getMutationTree()
    function render() {
      if (accessTree.state.foo === 'bar') {
        return
      }
      accessTree.state.bar // eslint-disable-line
    }

    render()
    mutationTree.state.foo = 'bar2'
    mutationTree.flush()
    tree.disposeTree(accessTree)
    expect(tree.pathDependencies).toEqual({})
  })
  test('should allow subsequent mutation tracking and return all on flush', () => {
    const tree = new ProxyStateTree({
      foo: 'bar',
    })
    const mutationTree = tree.getMutationTree()
    const mutationTree2 = tree.getMutationTree()
    mutationTree.state.foo = 'bar2'
    mutationTree2.state.foo = 'bar3'

    const flushResult = tree.flush([mutationTree, mutationTree2])
    expect(flushResult).toEqual({
      flushId: 0,
      mutations: [
        {
          path: 'foo',
          method: 'set',
          args: ['bar2'],
          hasChangedValue: true,
          delimiter: '.',
        },
        {
          path: 'foo',
          method: 'set',
          args: ['bar3'],
          hasChangedValue: true,
          delimiter: '.',
        },
      ],
    })
  })
})

describe('ITERATIONS', () => {
  test('should track paths when using array iteration methods', () => {
    const tree = new ProxyStateTree({
      items: [
        {
          title: 'foo',
        },
        {
          title: 'bar',
        },
      ],
    })
    const accessTree = tree.getTrackStateTree().track(() => {})

    accessTree.state.items.forEach((item) => {
      item.title // eslint-disable-line
    })

    expect(accessTree.pathDependencies).toEqual(
      new Set(['items', 'items.0', 'items.0.title', 'items.1', 'items.1.title'])
    )
  })

  test('should track paths when using Object.keys', () => {
    const tree = new ProxyStateTree({
      items: {
        foo: 'bar',
        bar: 'baz',
      },
    })
    const accessTree = tree.getTrackStateTree().track(() => {})
    Object.keys(accessTree.state.items).forEach((key) => {
      accessTree.state.items[key] // eslint-disable-line
    })
    expect(accessTree.pathDependencies).toEqual(
      new Set(['items', 'items.foo', 'items.bar'])
    )
  })

  test('should track new and deleted props on objects', () => {
    let runCount = 0

    expect.assertions(3)
    const tree = new ProxyStateTree({
      items: {} as any,
    })
    const accessTree = tree.getTrackStateTree().track(update)
    const mutationTree = tree.getMutationTree()
    function update() {
      accessTree.state.items // eslint-disable-line

      if (runCount === 1) {
        expect(accessTree.pathDependencies).toEqual(new Set(['items']))
      }
      if (runCount === 2) {
        expect(accessTree.pathDependencies).toEqual(new Set(['items']))
      }
      if (runCount === 3) {
        expect(accessTree.pathDependencies).toEqual(new Set(['items']))
      }

      runCount++
    }

    update()
    mutationTree.state.items.foo = 'bar'
    mutationTree.flush()
    mutationTree.state.items.bar = 'baz'
    mutationTree.flush()
    delete mutationTree.state.items.foo
    mutationTree.flush()
  })

  test('should react to array mutation methods', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      items: [
        {
          title: 'foo',
        },
        {
          title: 'bar',
        },
      ],
    })
    const accessTree = tree.getTrackStateTree().track(() => {
      reactionCount++
    })
    const mutationTree = tree.getMutationTree()
    accessTree.state.items.map((item) => item.title)

    expect(accessTree.pathDependencies).toEqual(
      new Set(['items', 'items.0', 'items.0.title', 'items.1', 'items.1.title'])
    )

    mutationTree.state.items.push({
      title: 'mip',
    })
    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })

  test('should react to object array item value mutation', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      items: [
        {
          title: 'foo',
        },
        {
          title: 'bar',
        },
      ],
    })
    const accessTree = tree.getTrackStateTree().track(() => {
      reactionCount++
    })
    const mutationTree = tree.getMutationTree()

    accessTree.state.items.map((item) => item.title)
    expect(accessTree.pathDependencies).toEqual(
      new Set(['items', 'items.0', 'items.0.title', 'items.1', 'items.1.title'])
    )
    mutationTree.state.items[0].title = 'baz'
    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })

  test('should react to int array item mutation', () => {
    let reactionCount = 0
    const tree = new ProxyStateTree({
      items: [1, 2],
    })
    const accessTree = tree.getTrackStateTree().track(() => {
      reactionCount++
    })
    const mutationTree = tree.getMutationTree()

    accessTree.state.items.map((item) => item)
    expect(accessTree.pathDependencies).toEqual(
      new Set(['items', 'items.0', 'items.1'])
    )
    mutationTree.state.items[0] = 99
    mutationTree.flush()
    expect(reactionCount).toBe(1)
  })
})

describe('RESCOPING', () => {
  it('should be able to change scope of state', () => {
    const tree = new ProxyStateTree({
      foo: 'bar',
    })

    const accessTree = tree.getTrackStateTree().track(() => {})
    const mutationTree = tree.getMutationTree()

    const state = accessTree.state
    const rescoped = tree.rescope(state, mutationTree)

    rescoped.foo = 'bar2'

    expect(tree.state.foo).toBe('bar2')
  })
})

describe('GETTER', () => {
  it('should be able to define and track getters in the tree', () => {
    let renderCount = 0
    const tree = new ProxyStateTree({
      user: {
        firstName: 'Bob',
        lastName: 'Goodman',
        get fullName() {
          return this.firstName + ' ' + this.lastName
        },
      },
    })

    const accessTree = tree.getTrackStateTree()
    const mutationTree = tree.getMutationTree()

    function render() {
      accessTree.track(render)
      accessTree.state.user.fullName
      renderCount++
    }

    render()

    mutationTree.state.user.firstName = 'Bob2'
    mutationTree.flush()
    expect(renderCount).toBe(2)
  })
})

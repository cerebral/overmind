import ProxyStateTree, { IS_PROXY } from "./";

describe("CREATION", () => {
  test("should create a ProxyStateTree instance", () => {
    const tree = new ProxyStateTree({});

    expect(tree).toBeInstanceOf(ProxyStateTree);
  });

  test("should create proxy of root state", () => {
    const state = {};
    const tree = new ProxyStateTree(state);

    expect(tree.get()[IS_PROXY]).toBeTruthy();
  });

  test("should not create nested proxies when initialized", () => {
    const state = {
      foo: {}
    };
		new ProxyStateTree(state); // eslint-disable-line

    expect(state.foo[IS_PROXY]).not.toBeTruthy();
  });
});

describe("OBJECTS", () => {
  describe("ACCESS", () => {
    test("should create proxy when accessed", () => {
      const state = {
        foo: {}
      };
      const tree = new ProxyStateTree<typeof state>(state);
			tree.get().foo; // eslint-disable-line
      expect(state.foo[IS_PROXY]).toBeTruthy();
    });
    test("should access properties", () => {
      const state = {
        foo: {
          bar: "baz"
        }
      };
      const tree = new ProxyStateTree<typeof state>(state);
      expect(tree.get().foo.bar).toBe("baz");
    });
    test("should track access properties", () => {
      const state = {
        foo: {
          bar: "baz"
        }
      };
      const tree = new ProxyStateTree<typeof state>(state);
      const trackId = tree.startPathsTracking();
      expect(tree.get().foo.bar).toBe("baz");
      const paths = tree.clearPathsTracking(trackId);
      expect(paths).toEqual(new Set(["foo", "foo.bar"]));
    });
  });
  describe("MUTATIONS", () => {
    test("should throw when mutating without tracking", () => {
      const state = {
        foo: "bar"
      };
      const tree = new ProxyStateTree<typeof state>(state);
      expect(() => {
        tree.get().foo = "bar2";
      }).toThrow();
    });
    test("should track SET mutations", () => {
      const state = {
        foo: "bar"
      };
      const tree = new ProxyStateTree<typeof state>(state);
      tree.startMutationTracking();
      tree.get().foo = "bar2";
      const mutations = tree.clearMutationTracking();
      expect(mutations).toEqual([
        {
          method: "set",
          path: "foo",
          args: ["bar2"]
        }
      ]);
      expect(tree.get().foo).toBe("bar2");
    });
    test("should track UNSET mutations", () => {
      const state = {
        foo: "bar"
      };
      const tree = new ProxyStateTree<typeof state>(state);
      tree.startMutationTracking();
      delete tree.get().foo;
      const mutations = tree.clearMutationTracking();
      expect(mutations).toEqual([
        {
          method: "unset",
          path: "foo",
          args: []
        }
      ]);
      expect(tree.get().foo).toBe(undefined);
    });
  });
});

describe("ARRAYS", () => {
  describe("ACCESS", () => {
    test("should create proxies of arrays", () => {
      const state = {
        foo: []
      };
      const tree = new ProxyStateTree<typeof state>(state);
			tree.get().foo; // eslint-disable-line
      expect(state.foo[IS_PROXY]).toBeTruthy();
    });
    test("should access properties", () => {
      const state = {
        foo: "bar"
      };
      const tree = new ProxyStateTree<typeof state>(state);
      expect(tree.get().foo[0]).toBe("b");
    });
    test("should track access properties", () => {
      const state = {
        foo: ["bar"]
      };
      const tree = new ProxyStateTree<typeof state>(state);
      const trackId = tree.startPathsTracking();
      expect(tree.get().foo[0]).toBe("bar");
      const paths = tree.clearPathsTracking(trackId);
      expect(paths).toEqual(new Set(["foo", "foo.0"]));
    });
    test("should allow nested tracking", () => {
      type Item = {
        title: string
      }
      const tree = new ProxyStateTree<{
        foo: Item[]
      }>({
        foo: [
          {
            title: "foo"
          }
        ]
      });

      const state = tree.get();
      const trackIdA = tree.startPathsTracking();
      state.foo.map(item => {
        const trackIdB = tree.startPathsTracking();
        item.title; // eslint-disable-line
        const pathsB = tree.clearPathsTracking(trackIdB);
        expect(pathsB).toEqual(new Set(["foo.0.title"]));
      });
      const pathsA = tree.clearPathsTracking(trackIdA);
      expect(pathsA).toEqual(new Set(["foo", "foo.0"]));
    });
    test("should throw when stopping outer nested tracking before inner", () => {
      const tree = new ProxyStateTree({});

      const trackIdA = tree.startPathsTracking();
      tree.startPathsTracking();
      expect(() => {
        tree.clearPathsTracking(trackIdA);
      }).toThrow();
    });
  });

  describe("MUTATIONS", () => {
    test("should throw when mutating without tracking", () => {
      const state = {
        foo: []
      };
      const tree = new ProxyStateTree<{
        foo: string[]
      }>(state);
      expect(() => {
        tree.get().foo.push("foo");
      }).toThrow();
    });
    test("should track PUSH mutations", () => {
      const state = {
        foo: []
      };
      const tree = new ProxyStateTree<{
        foo: string[]
      }>(state);
      tree.startMutationTracking();
      tree.get().foo.push("bar");
      const mutations = tree.clearMutationTracking();
      expect(mutations).toEqual([
        {
          method: "push",
          path: "foo",
          args: ["bar"]
        }
      ]);

      // expect(tree.get().foo).toEqual(["bar"]); BUG IN JEST
      expect(tree.get().foo[0]).toBe("bar");
    });
    test("should track POP mutations", () => {
      const state = {
        foo: ["foo"]
      };
      const tree = new ProxyStateTree<typeof state>(state);
      tree.startMutationTracking();
      tree.get().foo.pop();
      const mutations = tree.clearMutationTracking();
      expect(mutations).toEqual([
        {
          method: "pop",
          path: "foo",
          args: []
        }
      ]);

      expect(tree.get().foo.length).toBe(0);
    });
    test("should track POP mutations", () => {
      const state = {
        foo: ["foo"]
      };
      const tree = new ProxyStateTree<typeof state>(state);
      tree.startMutationTracking();
      tree.get().foo.shift();
      const mutations = tree.clearMutationTracking();
      expect(mutations).toEqual([
        {
          method: "shift",
          path: "foo",
          args: []
        }
      ]);

      expect(tree.get().foo.length).toBe(0);
    });
    test("should track UNSHIFT mutations", () => {
      const state = {
        foo: []
      };
      const tree = new ProxyStateTree<{
        foo: string[]
      }>(state);
      tree.startMutationTracking();
      tree.get().foo.unshift("foo");
      const mutations = tree.clearMutationTracking();
      expect(mutations).toEqual([
        {
          method: "unshift",
          path: "foo",
          args: ["foo"]
        }
      ]);

      expect(tree.get().foo[0]).toBe("foo");
    });
    test("should track SPLICE mutations", () => {
      const state = {
        foo: ["foo"]
      };
      const tree = new ProxyStateTree<typeof state>(state);
      tree.startMutationTracking();
      tree.get().foo.splice(0, 1, "bar");
      const mutations = tree.clearMutationTracking();
      expect(mutations).toEqual([
        {
          method: "splice",
          path: "foo",
          args: [0, 1, "bar"]
        }
      ]);

      expect(tree.get().foo[0]).toBe("bar");
    });
  });
});

describe("FUNCTIONS", () => {
  test("should call functions in the tree when accessed", () => {
    const state = {
      foo: () => "bar"
    };
    const tree = new ProxyStateTree<typeof state>(state);

    expect(tree.get().foo).toBe("bar");
  });
  test("should pass proxy-state-tree instance and path", () => {
    const state = {
      foo: (proxyStateTree, path) => {
        expect(proxyStateTree).toBe(tree);
        expect(path).toEqual("foo");

        return "bar";
      }
    };
    const tree = new ProxyStateTree<typeof state>(state);

    expect(tree.get().foo).toBe("bar");
  });
});

describe("REACTIONS", () => {
  test("should be able to register a listener using paths", () => {
    let reactionCount = 0;
    const tree = new ProxyStateTree<{
      foo: string
    }>({
      foo: "bar"
    });
    const state = tree.get();
    const trackId = tree.startPathsTracking();
    state.foo; // eslint-disable-line
    const paths = tree.clearPathsTracking(trackId);
    tree.addMutationListener(paths, () => {
      reactionCount++;
    });
    tree.startMutationTracking();
    state.foo = "bar2";
    tree.clearMutationTracking();
    tree.flush();
    expect(reactionCount).toBe(1);
  });
  test("should only trigger ones when multiple paths mutated", () => {
    let reactionCount = 0;
    const tree = new ProxyStateTree<{
      foo: string,
      bar: string
    }>({
      foo: "bar",
      bar: "baz"
    });
    const state = tree.get();
    const trackId = tree.startPathsTracking();
    state.foo; // eslint-disable-line
    state.bar; // eslint-disable-line
    const paths = tree.clearPathsTracking(trackId);
    tree.addMutationListener(paths, () => {
      reactionCount++;
    });
    tree.startMutationTracking();
    state.foo = "bar2";
    state.bar = "baz2";
    tree.clearMutationTracking();
    tree.flush();
    expect(reactionCount).toBe(1);
  });
  test("should be able to update listener using paths", () => {
    const tree = new ProxyStateTree<{
      foo: string,
      bar: string
    }>({
      foo: "bar",
      bar: "baz"
    });
    const state = tree.get();
    function render() {
      const trackId = tree.startPathsTracking();
      if (state.foo === "bar") {
      } else {
        state.bar; // eslint-disable-line
      }
      return tree.clearPathsTracking(trackId);
    }
    const listener = tree.addMutationListener(render(), () => {
      listener.update(render());
    });
    tree.startMutationTracking();
    state.foo = "bar2";
    tree.clearMutationTracking();
    tree.flush();
    expect((tree.pathDependencies as any).foo.size).toBe(1);
    expect((tree.pathDependencies as any).bar.size).toBe(1);
  });
  test("should be able to remove listener", () => {
    const tree = new ProxyStateTree<{
      foo: string,
      bar: string
    }>({
      foo: "bar",
      bar: "baz"
    });
    const state = tree.get();
    function render() {
      const trackId = tree.startPathsTracking();
      if (state.foo === "bar") {
      } else {
        state.bar; // eslint-disable-line
      }
      return tree.clearPathsTracking(trackId);
    }
    const listener = tree.addMutationListener(render(), () => {
      listener.dispose();
    });
    tree.startMutationTracking();
    state.foo = "bar2";
    tree.clearMutationTracking();
    tree.flush();
    expect(tree.pathDependencies).toEqual({});
  });
});

describe("ITERATIONS", () => {
  test("should track paths when using array iteration methods", () => {
    type Item = {
      title: string
    }
    const tree = new ProxyStateTree<{
      items: Item[]
    }>({
      items: [
        {
          title: "foo"
        },
        {
          title: "bar"
        }
      ]
    });
    const state = tree.get();
    const trackId = tree.startPathsTracking();
    state.items.forEach(item => {
      item.title; // eslint-disable-line 
    });
    const paths = tree.clearPathsTracking(trackId);

    expect(paths).toEqual(
      new Set(["items", "items.0", "items.0.title", "items.1", "items.1.title"])
    );
  });
  test("should track paths when using Object.keys", () => {
    const tree = new ProxyStateTree<{
      items: {
        foo: string,
        bar: string
      }
    }>({
      items: {
        foo: "bar",
        bar: "baz"
      }
    });
    const state = tree.get();
    const trackId = tree.startPathsTracking();
    Object.keys(state.items).forEach(key => {
      state.items[key]; // eslint-disable-line
    });
    const paths = tree.clearPathsTracking(trackId);
    expect(paths).toEqual(new Set(["items", "items.foo", "items.bar"]));
  });
  test("should react to array mutation methods", () => {
    type Item = {
      title: string
    }
    let reactionCount = 0;
    
    const tree = new ProxyStateTree<{
      items: Item[]
    }>({
      items: [
        {
          title: "foo"
        },
        {
          title: "bar"
        }
      ]
    });
    const state = tree.get();
    const trackId = tree.startPathsTracking();
    state.items.map(item => item.title);
    const paths = tree.clearPathsTracking(trackId);
    expect(paths).toEqual(
      new Set(["items", "items.0", "items.0.title", "items.1", "items.1.title"])
    );
    tree.addMutationListener(paths, () => {
      reactionCount++;
    });
    tree.startMutationTracking();
    state.items.push({
      title: "mip"
    });
    tree.clearMutationTracking();
    tree.flush();
    expect(reactionCount).toBe(1);
  });
});

# proxy-state-tree
An implementation of the Mobx/Vue state tracking approach, for library authors 

`npm install proxy-state-tree@beta`

## Why
The **proxy-state-tree** project is created to stimulate innovation in state management. The introduction of [Flux](https://facebook.github.io/flux/) was followed by a big wave of libraries trying to improve on the idea. All these iterations helped moving the community forward and [Redux](https://redux.js.org/) was born a year later. It was frustrating to have all these variations of the same idea, but at the same time it made the core idea better. One factor I believe made this possible is that Flux state management is based on **immutability**. It is a difficult concept to understand, but when you understand it, it is easy to implement the concept of **change**. You literally just check if a value you depend on has changed. That said, immutability tends to put a lof effort on the hands of the consumer. You have to think really hard about how you structure state and expose state to components to avoid performance issues and prevent boilerplate.

[vuejs](https://vuejs.org/) and [mobx](https://github.com/mobxjs/mobx) has a different approach to **change**. They use **getter/setter interception** to track access to state and changes to state. This concept completely removes the consumers burden of how the state is structured and how it is exposed to the different parts of the app. You just expose state in any form and the usage is automatically tracked and optimized. The problem with this approach though is that it is difficult to implement as a library author. **I want to change that!**

**proxy-state-tree** is a low level implementation of the **getter/setter interception** with a **single state tree** to help library authors innovate. I hope to see innovations that removes the burden that immutability currently causes, but keeps the guarantees that was introduced in **Flux**. I invite you to make a mobx and redux baby! ;-)

## Examples

- [Vue](https://codesandbox.io/s/5vy5jxrpop) example with a simple implementation that allows you to define a state tree and expose a store to the components which can be mutated in the methods

- [Preact](https://codesandbox.io/s/lpmv68r8y9) example with a simple implementation of a external state and actions passed on a Provider. Also includes a simple, but inspiring debugger

## Create a tree

```js
import ProxyStateTree from 'proxy-state-tree'

const tree = new ProxyStateTree({})

console.log(tree.get()) // {}
```

As a library author you would typically expose a mechanism to define the initial state of the application, which you would pass to the **ProxyStateTree**. You would also expose a way to access the state, hiding the `tree.get()` from the consumer of your library.

## Track access

You can track access to the state by using the **startPathsTracking** and **clearPathsTracking** methods.

```js
import ProxyStateTree from 'proxy-state-tree'

const tree = new ProxyStateTree({
  foo: 'bar',
  bar: 'baz'
})
const state = tree.get()

const trackId = tree.startPathsTracking()
const foo = state.foo
const bar = state.bar
const paths = tree.clearPathsTracking(trackId)

console.log(paths) // Set { 'foo', 'bar' }
```

You would typically use this mechanism to track usage of state. For example rendering a component, calculating a a computed value etc. The returned paths array is stored for later usage. The paths structure is used internally by proxy-state-tree, but you can also consume it as a library author to for example showing components and what paths they depend on in a devtool. Nested paths uses dot notation, for example `['foo.bar']`. Path tracking can be nested, but they can not run at the same time. Meaning the nested tracking must finish before the outer tracker.

## Track mutations

```js
import ProxyStateTree from 'proxy-state-tree'

const tree = new ProxyStateTree({
  foo: 'bar',
  bar: []
})
const state = tree.get()

tree.startMutationTracking()
state.foo = 'bar2'
state.bar.push('baz')
const mutations = tree.clearMutationTracking()

console.log(mutations)
/*
  [{
    method: 'set',
    path: ['foo'],
    args: ['bar2']  
  }, {
    method: 'push',
    path: ['bar'],
    args: ['baz']
  }]
*/
```

You would use **startMutationTracking** and **clearMutationTracking** around logic that is allowed to do mutations, for example actions or similar. Trying to mutate without this tracking active results in an error. The returned array can be used in combination with a devtool.

## Check need to update

```js
import ProxyStateTree from 'proxy-state-tree'

const tree = new ProxyStateTree({
  foo: 'bar',
  bar: 'baz'
})
const state = tree.get()

function render () {
  const trackId = tree.startPathsTracking()
  const foo = state.foo
  const bar = state.bar

  return tree.clearPathsTracking(trackId)
}

const listener = tree.addMutationListener(render(), () => {
  // Runs when mutations matches paths passed in

  // Whenever mutations affecting these paths occurs
  // we typically create the paths again due to possible
  // conditional logic, in "render" in this example
  listener.update(render()) 
})

tree.startMutationTracking()
state.foo = 'bar2'
state.bar.push('baz')
tree.clearMutationTracking()

// This command flushes out the current mutations and
// notifies any listeners
tree.flush()

// Remove listener
listener.dispose()
```

Here we combine the tracked paths with the mutations performed to see if this components, computed or whatever indeed needs to run again, doing a new **startPathsTracking** and **clearPathsTracking**.

## Dynamic state values

If you insert a function into the state tree it will be called when accessed. The function is passed the **proxy-state-tree** instance and the path of where the function lives in the tree.

```js
import ProxyStateTree from 'proxy-state-tree'

const tree = new ProxyStateTree({
  foo: (proxyStateTree, path) => {}
})
```

The allows you to easily extend functionality with for example a computed concept that lives in the tree, as you can see in this [codesandbox](https://codesandbox.io/s/xnv45zmkz).
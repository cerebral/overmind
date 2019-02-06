# proxy-state-tree
An implementation of the Mobx/Vue state tracking approach with a state tree, for library authors 

`npm install proxy-state-tree`

## Why
The **proxy-state-tree** project is created to stimulate innovation in state management. The introduction of [Flux](https://facebook.github.io/flux/) was followed by a big wave of libraries trying to improve on the idea. All these iterations helped moving the community forward and [Redux](https://redux.js.org/) was born a year later. It was frustrating to have all these variations of the same idea, but at the same time it made the core idea better. One factor I believe made this possible is that Flux state management is based on **immutability**. It is a difficult concept to understand, but when you understand it, it is easy to implement the concept of **change**. You literally just check if a value you depend on has changed. That said, immutability tends to put a lof effort on the hands of the consumer. You have to think really hard about how you structure state and expose state to components to avoid performance issues and prevent boilerplate.

[vuejs](https://vuejs.org/) and [mobx](https://github.com/mobxjs/mobx) has a different approach to **change**. They use **getter/setter interception** to track access to state and changes to state. This concept completely removes the consumers burden of how the state is structured and how it is exposed to the different parts of the app. You just expose state in any form and the usage is automatically tracked and optimized. The problem with this approach though is that it is difficult to implement as a library author. **I want to change that!**

**proxy-state-tree** is a low level implementation of the **getter/setter interception** with a **single state tree** to help library authors innovate. I hope to see innovations that removes the burden that immutability currently causes, but keeps the guarantees that was introduced in **Flux**. I invite you to make a mobx and redux baby! ;-)

## Create a tree

```js
import { ProxyStateTree } from 'proxy-state-tree'

const initialState = {}

const tree = new ProxyStateTree(initialState)
```

As a library author you would typically expose a mechanism to define the initial state of the application, which you would pass to the **ProxyStateTree**.

## TrackStateTree

```js
const tree = new ProxyStateTree({
  foo: 'bar'
})

const trackStateTree = tree.getTrackStateTree()

trackStateTree.state.foo // "bar"
```

This is a "fork" of the tree which allows you to access and track access to state. You can have multiple forks and you would typically give each component its own state tracking tree.

### track

```js
const trackStateTree = tree.getTrackStateTree()

trackStateTree.track(() => {
  // Called when any tracked state mutates
})
```

Only one forked tree can track at any time. That means one tree stops tracking when an other starts tracking. Since all component libraries produces their UI description synchronously, this gives a predictable behaviour. You still have to stop tracking when the component is done rendering though, to avoid any asynchronous additions to the rendering of the last component (which would just keep tracking until a new component renders).

```js
const trackStateTree = tree.getTrackStateTree()

trackStateTree.stopTracking()
```

### track with unique proxifier

```js
const trackStateTree = tree.getTrackStateTreeWithProxifier()

trackStateTree.track(() => {
  // Called when any tracked state mutates
})
```

This version of the tree also has its own **Proxifier** instance. That means the state provided to the component is owned by the component. The benefit of this approach is that you do not depend on synchronous rendering. The component can start to render, then render something else and then continue rendering the component and still track correctly. You will typically call **track** again whenever there is an update, to refresh the tracked paths. You can stop the tracking also if you know when the rendering is done. This avoid any asynchronous tracking inside the component to happen.

To support passing a proxy from one component to an other, the **rescope** method can be used:

```js
const trackStateTreeA = tree.getTrackStateTreeWithProxifier()
const trackStateTreeB = tree.getTrackStateTreeWithProxifier()

const movedProxy = tree.rescope(trackStateTreeA.state.someObjectOrArray, trackStateTreeB)
```

## track scope

```js
const trackStateTree = tree.getTrackStateTree()

trackStateTree.trackScope((tree) => {
  // Some logic accessing the state of the tree
})
```

Sometimes you do want to scope the tracking to a callback. This ensures that the tracking indeed runs completely synchronous within the scope of the callback. Optionally you can also give a callback to be notified when mutations affects the tracked state.

```js
const trackStateTree = tree.getTrackStateTree()

trackStateTree.trackScope((tree) => {
  // Some logic accessing the state of the tree
}, () => {
  // Notifies about changes
})
```

### addTrackingPath

```js
const trackStateTree = tree.getTrackStateTree()

trackStateTree.addTrackingPath('foo.bar')
```

You can manually add paths that the tree should track.

## MutationTree

```js
const tree = new ProxyStateTree({
  foo: 'bar'
})

const mutationTree = tree.getMutationTree()

mutationTree.state.foo = "bar"
```

This forked tree is allowed to perform actual mutations. 

### onMutation

```js
const mutationTree = tree.getMutationTree()

mutationTree.onMutation((mutation) => {
  // mutation: { method, args, path }
})
```

Allows you to listen to mutations on the specific tree.

## diposeTree

```js
const tree = new ProxyStateTree({})

const trackStateTree = tree.getTrackStateTree()

tree.disposeTree(trackStateTree)
```

Allows you to dipose of a tree no longer in use. ProxyStateTree will keep a reference and reuse the tree whenever a new fork is requested.

## flush

```js
const tree = new ProxyStateTree({
  foo: 'bar'
})

const mutationTree = tree.getMutationTree()

mutationTree.state.foo = "bar2"

mutationTree.flush()
```

To notify trees tracking state about mutations made run the **flush** method. This allows you to control when the trackers should actually be notified.

You can also flush out multiple mutation trees. This can be useful in development.

```js
const tree = new ProxyStateTree({
  foo: 'bar',
  bar: 'baz'
})

const mutationTree = tree.getMutationTree()
const mutationTree2 = tree.getMutationTree()

mutationTree.state.foo = "bar2"
mutationTree2.state.bar = "baz2"

tree.flush([mutationTree, mutationTree2])
```

A flush returns what mutations has been flushed out, also with a *flushId*.

## onMutation

```js
const tree = new ProxyStateTree({
  foo: 'bar'
})

tree.onMutation(() => {})
```

Get notified when any mutation is made to any fork of **MutationTree**.

## onFlush

```js
const tree = new ProxyStateTree({
  foo: 'bar'
})

tree.onFlush(() => {})
```

Get notified when a flush is made.


## rescope

```js
const tree = new ProxyStateTree({
  foo: 'bar'
})

const trackStateTree = tree.getTrackStateTree()
const mutationTree = tree.getMutationTree()

// This is now a proxy tracked by TrackStateTrees
const foo = trackStateTree.state.foo

// We can rescope this value to a MutationTree
tree.rescope(foo, mutationTree)
```

Rescoping proxies between trees is useful in development as the MutationTrees has their own proxies. Unlike in production where all trees shares the same proxies.

## Production

When running in development all **TrackStateTree** forks has the same *proxifier*, meaning they share proxies. They can do this cause the trees "hand over" tracking to each other.

Every fork of a **MutationTree** has its own *proxifier*. The reason for this is that in development each mutation tree fork should live on its own for tracking purposes. 

When running in production there is only one *proxifier* shared among all trees, and there is only one mutationtree instance as tracking is no longer needed.

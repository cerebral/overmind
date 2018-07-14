# Other views

The default instance of Overmind exposes tools to track access to state. This allows you to integrate Overmind with any view layer you want. Overmind has several preset view implementations like **React**, **VueJS, Preact** etc.

```typescript
import App from 'overmind'

const {
  state,
  actions,
  trackState,
  clearTrackState,
  addMutationListener
} = new App({
  state: {
    title: 'Hello from Overmind'
  },
  actions: (action) => ({
    changeTitle: action()
      .map(event => event.target.value)
      .mutate((state, value) => state.title = value)
  })
})
```

#### state

This is the state of your application.

#### actions

The actions defined. These are just plain functions you call with a value:

```typescript
document.querySelector('#input').addEventListener('input', actions.changeTitle)
```

#### trackState / clearTrackState

This function allows you to track when state is accessed. Typically you would use this in combination with lifecycle hooks of components to track what the component accesses on render:

```typescript
const trackId = trackState('ComponentName')
// Logic that renders a component
const paths = clearTrackState(trackId)

paths // Set { 'path.to.some.state', 'path.to.some.other.state' }
```

This information is automatically passed to the Overmind devtools. 

**addMutationListener**

This function is used with the tracked paths. You typically create the listener on the first render and update it on subsequent renders:

```typescript
const listener = addMutationListener(paths, () => {
  // This callback is called when the paths are mutated
  // Typically here you trigger a new render of the component
  // and update the paths of the listener with the new tracked paths
})

listener.update(newPaths) // Update the listener with new paths
listener.dispose() // Dispose the listener, typically when component unmounts
```

Look at the Overmind implementations of the different views to see how this is used in practice.


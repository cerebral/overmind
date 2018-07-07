# Overmind

Overmind is a state and side effects management tool for popular JavaScript frameworks. If you are familiar with projects like Redux, Vuex, Mobx or similar solutions, Overmind is taking it to the next step.

The default instance of Overmind exposes tools to track access to state and mutation of state. These are the tools you need to integrate Overmind with a view. Luckily Overmind has several preset view implementations like **React**, **VueJS, Preact** etc.

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

### An example application using React and TypeScript

This example shows a structured application using two modules. The **compose** function allows you to namespace your modules. In this example we are not taking any shortcuts. We explicitly split up and type all functions, components etc. By default this typing would be inferred when inlining the functions and components, but we are taking full advantage of the functional approach which makes the application highly testable, predictable and composable. The usage of two modules here is artificial, but important to show you how modules has access to each other.

{% code-tabs %}
{% code-tabs-item title="index.tsx" %}
```typescript
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

render(<App />, document.querySelector('#app'))
```
{% endcode-tabs-item %}

{% code-tabs-item title="overmind.ts" %}
```typescript
import Overmind, { IContext, IAction, IConnect, compose } from 'overmind/react'
import * as main from './modules/main'
import * as items from './modules/items'

export type AppState = {
  main: main.State,
  items: items.State
}

export type Context = IContext<AppState>

export type Action = IAction<Context>

const app = new Overmind(compose({
  main,
  items
}))

export type Connect = IConnect<typeof app.state, typeof app.actions>

export const connect = app.connect

```
{% endcode-tabs-item %}

{% code-tabs-item title="modules/main/index.ts" %}
```typescript
import { AppState, Action } from '../../overmind'

/*
  STATE
*/
export type State = {
  newItemValue: string
}

export const state: State = {
  newItemValue: ''
}

/*
  MUTATIONS
*/
export const setNewItemValue = (state: AppState, value: string) => state.main.newItemValue = value

/*
  HELPERS
*/
export const getEventValue = (event: React.ChangeEvent) => event.target.value

/*
  ACTIONS
*/
export const actions = (action: Action) => ({
  changeNewItemValue: action<React.ChangeEvent>()
    .map(getEventValue)
    .mutation(setNewItemValue)
})
```
{% endcode-tabs-item %}

{% code-tabs-item title="modules/items/index.ts" %}
```typescript
import { AppState, Context, Action } from '../../overmind'

/*
  STATE
*/
export type Item = {
  title: string
}

export type State = {
  items: Item[]
}

export const state: State = {
  items: []
}

/*
  MUTATIONS
*/
export const addNewItem = (state: AppState, item: Item) => state.items.list.push(item)

export const resetNewItemValue = (state: AppState) => state.main.newItemValue = ''

/*
  HELPERS
*/
export const createItem = (_, { state }: Context) => ({
  title: state.main.newItemValue
})

/*
  ACTIONS
*/
export const actions = (action: Action) => ({
  addNewItem: action()
    .map(createItem)
    .mutation(addNewItem)
    .mutation(resetNewItemValue)
})
```
{% endcode-tabs-item %}

{% code-tabs-item title="components/App/index.tsx" %}
```typescript
import React from 'react'
import { connect, Connect } from '../../overmind'

const App: React.SFC<Connect> = ({ appState, actions }) => (
  <div>
    <form onSubmit={event => {
      event.preventDefault()
      actions.items.addNewItem()
    }}>
      <input
        onChange={actions.changeNewItemValue}
        value={appState.main.newItemValue}
      />
    </form>
    <ul>
      {appState.items.list.map(item => (
        <li>{item.title}</li>
      ))}
    </ul>
  </div>
)

export default connect(App)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

What to take notice of:

* We are not interfering in any way with the initial rendering of the app, meaning you just connect state where you need it
* By default Overmind takes a single module with state, actions etc., but **compose** allows us to merge multiple modules together, giving them a namespace \("main" and "items" in this example\)
* We separate mutations and other side effects. This makes it absolutely clear where mutations are performed and only the **mutation** operator is allowed to perform these mutations.
* The actions are now just plain functions taking any payload. When the action is typed it requires a value, when it is not typed, it does not require a value \(this is actually very difficult to do in TypeScript\)


# Namespacing

When your application grows it can be a good idea to separate your state and logic into different domains by using namespaces. An example of this is when you have an application with different pages. You might want to use each page as a namespace for state and logic. It might also make sense to have a namespace responsible for managing the data of your application, talking to the server etc. There is no one right answer here and it is up to you to define these namespaces.

Instead of defining one application module exporting state, providers and actions, you can define multiple modules.

{% code-tabs %}
{% code-tabs-item title="app/modules/moduleA.js" %}
```javascript
export const state = {
  title: 'Page A'
}

export const actions = action => ({
  doThis: action()
})
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/modules/moduleB.js" %}
```javascript
export const state = {
  title: 'Page B'
}

export const actions = action => ({
  doThis: action()
})
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/modules/moduleA.ts" %}
```typescript
import { Action } from '../'

type State = {
  title: string
}

export const state: State = {
  title: 'Page A'
}

export const actions = (action: Action) => ({
  doThis: action()
})

```
{% endcode-tabs-item %}

{% code-tabs-item title="app/modules/moduleB.ts" %}
```typescript
import { Action } from '../'

type State = {
  title: string
}

export const state: State = {
  title: 'Page B'
}

export const actions = (action: Action) => ({
  doThis: action()
})
```
{% endcode-tabs-item %}
{% endcode-tabs %}

In the main application file you will now use the **namespaces** function to define the namespaces:

{% code-tabs %}
{% code-tabs-item title="app/index.js" %}
```javascript
import App, { namespaces } from 'overmind/$VIEW'
import * as moduleA from './modules/moduleA'
import * as moduleB from './modules/moduleB'

const config = namespaces({
  moduleA,
  moduleB
})

const app = new App(config)

export const connect = app.connect
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/index.ts" %}
```typescript
import App, { TConnect, TContext, IAction, namespaces } from 'overmind/$VIEW'
import * as moduleA from './modules/moduleA'
import * as moduleB from './modules/moduleB'

const config = namespaces({
  moduleA,
  moduleB
})

export type Context = TContext<typeof config.state, typeof config.providers>

export type Action = IAction<typeof config.state, Context>

const app = new App(config)

export type Connect = TConnect<typeof app.state, typeof app.actions>

export const connect = app.connect
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Now your state, providers and actions are namespaced accordingly. Meaning that inside actions you would need to use `state.moduleA.title`and `state.moduleB.title`, the same goes for providers and actions.

### Dynamic namespaces

If you want to create a module that is shared between projects you want to make sure that any namespace might be used, but still be able to point correctly to state and providers inside the actions of your shared module.

A module can also be defined as a function which receives the namespace:

{% code-tabs %}
{% code-tabs-item title="app/index.js" %}
```javascript
export default (namespace) => ({
  state: {
    foo: 'bar'
  },
  actions: action => ({
    doThis: action()
      .map((_, context) => context[namespace].hello())
      .mutation(state => state[namespace].foo = 'bar2')
  }),
  providers: {
    hello: () => 'hello'
  }
})
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/index.ts" %}
```typescript
import { Namespace, IAction, TContext } from 'overmind'

export default (namespace: Namespace) => {
  type State = {
    foo: string
  }
  type NamespacedState = {
    [namespace]: State
  }
  type NamespacedProviders = {
    [namespace]: typeof providers
  }
  type Context = TContext<NamespacedState, NamespacedProviders>
  type Action = IAction<NamespacedState, Context>
  
  const state: State = {
    foo: 'bar'
  }
  const providers = {
    hello: () => 'hello'
  }
  const actions = (action: Action) => ({
    doThis: action()
      .map((_, context) => context[namespace].hello())
      .mutation(state => state[namespace].foo = 'bar2')
  })
  
  return {
    state,
    actions,
    providers
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

As you can see we are actively using the passed in namespace inside the actions to look up correct state and providers.


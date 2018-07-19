# Derived state

Sometimes state is not a value you insert, but a value calculated based on other state. This is what we call **derived** state. An example of this would be a list of the completed todos. You could filter out these todos inside a component, but the logic does not really belong there. It belongs with the rest of your application logic. What we want to make sure of is that this calculation only runs when it actually needs to, meaning when any of the existing completed todos becomes uncompleted or todos are added or removed from the list.

{% code-tabs %}
{% code-tabs-item title="app/state.js" %}
```javascript
import { derived } from 'overmind'

export default {
  todos: [],
  completedTodos: derived(
    state => state.todos.filter(todo => todo.completed)
  )
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/state.ts" %}
```typescript
import { derived } from 'overmind'

type Todo = {
  title: string
  completed: boolean
}

type State = {
  todos: Todo[]
  completedTodos: Todo[]
}

const state: State = {
  todos: [],
  completedTodos: derived(
    (state: State) => state.todos.filter(todo => todo.completed)
  )
}

export default state
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Even though you express the value as a function, it can be accessed as normal both in actions and components: `state.completedTodos`


# Computed values

Sometimes you want to compute a value based on some input and the current state of the application. That is why we have the concept of a **computed**.

{% code-tabs %}
{% code-tabs-item title="app/computed.js" %}
```javascript
import { computed } from 'overmind'

export const usersList = computed(config => state => {
  const users = state.users
  
  return users
    .filter(user => user.isAwesome === config.isAwesome)
    .sort((userA, userB) => userA[config.sortField] < userB[config.sortField])
    .slice(config.startIndex, config.endIndex)
})
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/computed.ts" %}
```typescript
import { computed } from 'overmind'
import { State } from './state'

export type UsersListConfig {
  isAwesome: boolean
  sortField: string
  startIndex: number
  endIndex: number
}

export const usersList = computed((config: UsersListConfig) => (state: State) => {
  const users = state.users
  
  return users
    .filter(user => user.isAwesome === config.isAwesome)
    .sort((userA, userB) => userA[config.sortField] < userB[config.sortField])
    .slice(config.startIndex, config.endIndex)
})
```
{% endcode-tabs-item %}
{% endcode-tabs %}

You attach computed to the state, just like **derived** state:

{% code-tabs %}
{% code-tabs-item title="app/state.js" %}
```javascript
import * as computed from './computed'

export default {
  users: [],
  usersList: computed.usersList
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/state.ts" %}
```typescript
import * as computed, { UsersListConfig } from './computed'

export type User = {
  name: string
}

export type State = {
  users: User[]
  usersList: (config: UsersListConfig) => User[]
}

export default {
  users: [],
  usersList: computed.usersList
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

You use a computed by calling it and giving it an argument, like **config** in this example.

Comuted values are also tracked by the devtools and shows up in the devtools state overview with details about the current value, how many times it has executed and cache information.


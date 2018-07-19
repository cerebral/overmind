# Side effects

Overmind helps you expose side effects to your application logic. It does this with a concept called **Providers**. A provider is nothing more than an object with methods or a class instance. For example exposing an http library like [axios](https://github.com/axios/axios)  could be done like this:

{% code-tabs %}
{% code-tabs-item title="app/providers.js" %}
```javascript
export { default as axios } from 'axios'
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Or you could expose it as a class and create a custom **API**:

```javascript
import axios from 'axios'

class Api {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  get(url, ...args) {
    return axios.get(this.baseUrl + url, ...args)
  }
}

export const api = new Api('/api/v1')
```

Using a class is useful when you want to pass in options based on the environment, or maybe the library exposes a class in itself.

The providers are added to the configuration of the app:

{% code-tabs %}
{% code-tabs-item title="app/index.js" %}
```javascript
import App from 'overmind/$VIEW'
import state from './state'
import actions from './actions'
import providers from './providers'

const app = new App({
  state,
  actions,
  providers
})

export const connect = app.connect
```
{% endcode-tabs-item %}

{% code-tabs-item title="app/index.ts" %}
```typescript
import App, { TContext, IAction, TConnect } from 'overmind/$VIEW'
import state from './state'
import actions from './actions'
import providers from './providers'

export type Context = TContext<typeof state, typeof providers>

export type Action = IAction<typeof state, Context>

const app = new App({
  state,
  actions
})

export type Connect = TConnect<typeof app.state, typeof app.actions>

export const connect = app.connect
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The Overmind devtools will actually track any usage of these providers and give you valuable information about their execution.


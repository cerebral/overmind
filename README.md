# Overmind

### Why Overmind?

Instead of writing components that isolates state:

{% code-tabs %}
{% code-tabs-item title="react.js" %}
```javascript
import React from 'react'

class InputComponent extends React.Component {
  state = {
    value: ''
  }
  changeValue = (event) => {
    this.setState({
      value: event.target.value
    })
  }
  render () {
    return <input value={this.state.value} onChange={this.changeValue} />
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

You keep your state and logic to change that state in Overmind:

{% code-tabs %}
{% code-tabs-item title="react.js" %}
```javascript
import App from 'overmind/react'

const app = new App({
  state: {
    value: ''
  },
  actions: action => ({
    changeValue: action()
      .map((event) => event.target.value)
      .mutation((state, value) => state.value = value)
  })
})

const InputComponent = app.connect(
  function InputComponent ({ appState, actions }) {
    return <input value={appState.value} onChange={actions.changeValue} />
  }
)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

There are many tools, like Redux, Mobx, Vuex, Hyperapp etc., that also moves state and logic outside your components. Where Overmind differs is:

* **Automatic render.** When you connect your app to a component the component will automatically and optimally rerender based on the state that is being used inside that component 
* **Safe mutations**. There is only one place in Overmind you can change the state of your application and that is inside the mutation operator. Any outside mutations throws errors 
* **Next level devtools.** The Overmind devtools gives you insight into everything that is happening inside your application. That being what state connected components are watching, actions being run, mutations performed and even side effects run 
* **Functional actions.** Instead of expressing logic as functions or methods, Overmind exposes an action chaining API. This forces you into a functional approach. Functional code encourages writing many small and focused functions that does one thing. This keeps your application more testable, maintainable and composable 
* **Typescript for the win**. You do not have to use Typescript with Overmind, but when you do you will get full type safety in action chains and components


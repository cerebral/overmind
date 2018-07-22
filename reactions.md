# Reactions

There are times you want to translate a state change into a side effect. Maybe you want to store some data to local storage when a certain state path is mutated. Or maybe inside a component you want to change its internal state or pass data to some UI plugin related to a state path change.

### Application reactions

You can define your reactions at the application level. These reactions will run as long as the application lives.

```javascript
import App from 'overmind/$VIEW'

const app = new App({
  state: {
    foo: 'bar'
  },
  reactions: (reaction, action) => {
    const storeFooInStorage = action()
      .do(({ storage, state }) => storage.set('foo', state.foo))

    return {
      storeFoo: reaction(state => state.foo, storeFooInStorage)
    }
  }
})
```

{% hint style="info" %}
What to take notice of is that if the returned state of the reaction was an array or object, any change within that array/object would cause the reaction to run again.
{% endhint %}

### Component reactions

Component reactions differ in the sense that they only live through the component lifecycle. They are unregistered when the component unmounts. Also you do not pass it an action, but a regular callback to run when the reaction triggers.

{% tabs %}
{% tab title="React" %}
```javascript
import React from 'react'
import { connect } from '../app'

class MyComponent extends React.Component {
  componentDidMount () {
    this.props.app.reaction(
      'focusInput',
      state => state.foo,
      () => this.input.focus()
    )
  }
  render () {
    return <input ref={node => { this.input = node} />
  }
}

export default connect(MyComponent)
```
{% endtab %}

{% tab title="Vue" %}

{% endtab %}
{% endtabs %}


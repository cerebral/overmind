# app

```javascript
import App from 'overmind/$view'

const app = new App({
  state,
  actions,
  providers,
  reactions
}, {
  // Connect to devtools with host and port. The host
  // might need to be your local IP, depending on environment
  devtools: 'localhost:1234'
})
```

Overmind currently supports **react** as view layer.

### Extend App

You can extend the Overmind application class to create a custom connector to other view layers.

```javascript
import App from 'overmind'

class MyApp extends App {
  connect(component) {
    // Starts tracking state access
    const trackId = this.trackState()
    
    // Stops tracking state access
    const paths = this.clearTrackstate(trackId)
    
    // Creates a mutation subscription
    const listener = this.addMutationListener(paths, () => {
      // This callback is called whenever a mutation
      // affects the tracked paths. Typically used
      // to re-render the component
    })
    
    // You will typically track the paths again when re-rendering
    // the component. Update the listener by passing the new paths
    listener.update(paths)
    
    // Typically when component unmounts you want to dispose
    // the listener
    listener.dispose()
    
    // A factory for creating reactions in components
    const reaction = this.createReactionFactory(component.name)
    
    // Pass this function to the component, which allows reactions
    // to be added with the following signature:
    // this.props.reaction('name', state => state.foo, () => {
    //   do something on state change
    // })
    reaction.add
    
    // Disposes the reactions registered. Typically do this when
    // component unmounts
    reaction.dispose
  }
}
```

Take a look at the existing view implementations for inspiration and reference.


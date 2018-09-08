# action

```javascript
import App from 'overmind/$VIEW'

const app = new App({
  actions: action => ({
    doThis: action()
      .do((context, value) => {})
  })
})
```

The actions is defined with a callback receiving the applications action factory. The function is expected to return an object with actions.

### map

Returns a new value to the chain.

```javascript
export default action => ({
  getEventValue: action()
    .map((_, event) => event.target.value)
})
```

```javascript
export default action => ({
  getPosts: action()
    .map(({ api }) => api.getPosts())
})
```

### mutation

Change the state of the application. State changes are only allowed in this operator, which is why it only receives the state as the first argument, not the other providers.

```javascript
export default action => ({
  changeInputValue: action()
    .mutation((state, value) => state.inputValue = value)
})
```

### do

Perform some side effect without returning a new value to the chain. Any returned value will be ignored.

```javascript
export default action => ({
  onClick: action()
    .do(({ track }) => track.click('someClick'))
})
```

### debounce

If the action has not been called again within the number of milliseconds, continue execution.

```javascript
export default action => ({
  search: action()
    .mutation((state, value) => state.searchInputValue = value)
    .debounce(200)
    .map(({ api}, value) => api.search(value)
})
```

### when

Fork execution into **true** and **false** actions based on an expression.

```javascript
export default action => ({
  openProfile: action()
    .when(({ state }) => state.user.isLoggedIn, {
      true: action(),
      false: action()
    })
})
```

### fork

Fork execution into any number of actions. Note that fork does not return a new value to the chain.

```javascript
export default action => ({
  openAdmin: action()
    .fork(({ state }) => state.user.role, {
      admin: action(),
      superuser: action(),
      user: action()
    })
})
```




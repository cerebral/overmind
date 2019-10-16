# json

Overmind wraps objects and arrays in your state structure with proxies. If you pass state to 3rd party libraries, to a service worker or similar, you should pass a long a copy of that state. This avoids the 3rd party tool from mutating your state when you do not want it to.

```marksy
h(Example, { name: "api/json" })
```

This function does a copy of any plain object or array, which are the only values that is wrapped with proxies. This ensures minimal work is done and keeps all other values alone.
# effects

```marksy
h(Example, { name: "api/effects" })
```

Effects is really just about exposing existing libraries or create your own APIs for doing side effects. When these effects are attached to the application they will be tracked by the devtools giving you additional debugging information. By "injecting" the effects this way also open up for better testability of your logic.
# Effects

```marksy
h(Example, { name: "api/effects" })
```

There is really no API with effects. You just expose existing libraries or create your own APIs for doing side effects. When these effects are attached to the application they will be tracked by the devtools giving you additional debugging information. By "injecting" the effects this way also opens up for easier testability of your logic.
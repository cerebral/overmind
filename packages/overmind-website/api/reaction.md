# Reaction

```marksy
h(Example, { name: "api/reaction_global" })
```

You can register reactions to act whenever a state path is affected by a mutation. The **global** reactions are configured with the application and will live as long as the application lives. A reaction results in an executed action.

## Component

```marksy
h(Example, { name: "api/reaction_component" })
```

Inside components reactions can be registered to perform view related side effects. These reactions are unregistered automatically when the component unmounts. 

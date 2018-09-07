# Running side effects

Developing applications is not only about managing state, but also managing side effects. A side effect is typically exampled with an http request or talking to local storage. In Overmind we just call this **effects**. Actually the state is also a type of effect. Unlike state all other effects has to be defined.

Let us start with a simple example.

```marksy
h(Example, { name: "guide/runningsideeffects/axios" })
```

We are just exporting an existing library from our effects file and include it in the application config. Now Overmind is aware of an **http** effect. It can track it for debugging and all operations will have it injected.

Let us put it to use in an operation that grabs the user of the application.

```marksy
h(Example, { name: "guide/runningsideeffects/getuser" })
```

That was basically it. We can take this a step further though. Maybe you want to create a more explicit API effect.

```marksy
h(Example, { name: "guide/runningsideeffects/object" })
```

Or maybe you need it to be configurable. Improving testability and environment variables.

```marksy
h(Example, { name: "guide/runningsideeffects/class" })
```

## Summary
Adding side effects is easy, but it is worth taking notice that you also get a chance to map an existing tool to something more domain specific. As we did here converting the general **get** method to a **getUser** method. If you think about it from an application standpoint it is kinda weird that it makes arbitrary requests to a string url. It is better to create an abstraction around it to keep things more maintainable and predictable.
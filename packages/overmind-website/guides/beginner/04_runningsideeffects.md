# Running side effects

Developing applications is not only about managing state, but also managing side effects. A side effect is typically exampled with an http request or talking to local storage. In Overmind we just call this **effects**.

## Exposing an existing tool

Let us just expose the [axios](https://github.com/axios/axios) library as an **http** effect.

```marksy
h(Example, { name: "guide/runningsideeffects/axios" })
```

We are just exporting the existing library from our effects file and include it in the application config. Now Overmind is aware of an **http** effect. It can track it for debugging and all actions and operators will have it injected.

Let us put it to use in an action that grabs the current user of the application.

```marksy
h(Example, { name: "guide/runningsideeffects/getuser" })
```

That was basically it. As you can see we are exposing some low level details like the http method used and the url. Let us follow the encouraged way of doing things and create our own **api** effect.

## Specific API

It is highly encouraged that you avoid exposing tools with their generic APIs. Rather build your own APIs that are more closely related to your application logic. So for example maybe you have an endpoint for fetching the current user. Create that as an API for your app.

```marksy
h(Example, { name: "guide/runningsideeffects/object" })
```

Now you can see how clean your application logic becomes:

```marksy
h(Example, { name: "guide/runningsideeffects/changestate" })
```

We could also make this effect configurable by defining it as a class instead. 

## Initializing effects

It can be a good idea to not allow your side effects to initialize when they are defined. This makes sure that they do not leak into tests or server side rendering. For example if you want to use Firebase. Instead of initializing the Firebase application immediately we rather do it behind an **initialize** method:

```marksy
h(Example, { name: "guide/runningsideeffects/initialize" })
```

We are doing 2 things here:

1. We have created an **initialize** method which we can call from the Overmind **onInitialize** action, which runs when the Overmind instance is created
2. We use an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) to create a scoped internal variable to be used for that specific effect

Example of initializing the effect:

```marksy
h(Example, { name: "guide/runningsideeffects/oninitialize" })
```

## Lazy effects

You can also lazily load your effects in the **initialize** method. Let us say we wanted to load Firebase and its API on demand, or maybe just split out the code to make our app start faster.

```marksy
h(Example, { name: "guide/runningsideeffects/lazy" })
```

In our initialize we would just have to wait for the initialize to finish before using the API:


```marksy
h(Example, { name: "guide/runningsideeffects/oninitialize_lazy" })
```

## Configurable effect

By defining a class we improve testability, allow using environment variables and even change out the actual request implementation.


```marksy
h(Example, { name: "guide/runningsideeffects/class" })
```

We export an instance of our **Api** to the application. This allows us to also create instances in isolation for testing purposes, making sure our Api class works as we expect.

## Summary
Adding side effects is easy, but it is worth taking notice that you also get a chance to map an existing tool to something more domain specific. As we did here converting the general **get** method to a **getCurrentUser** method. If you think about it from an application standpoint it is kinda weird that it makes arbitrary requests to a string url. It is better to create an abstraction around it to keep things more maintainable and predictable.
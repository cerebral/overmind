# Running side effects

Developing applications is not only about managing state, but also managing side effects. A side effect is typically exampled with an http request or talking to local storage. In Overmind we just call this **effects**. It is highly encouraged that you think about your effects as an application specific API that **you** design and implement. An example of this would be:

```marksy
h(Example, { name: "guide/runningsideeffects/changestate" })
```

As you can see we are very specific about what the effect does. This will improve the readability of your actual application logic and you keep the low level generic code abstracted away. But let us start more generically and you can choose how far you want to take this encouragement. 

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

```marksy
h(Example, { name: "guide/runningsideeffects/object" })
```

We could also make this effect configurable by defining it as a class instead. 
## Configurable effect

By defining a class we improve testability, allow using environment variables and even change out the actual request implementation.


```marksy
h(Example, { name: "guide/runningsideeffects/class" })
```

## Summary
Adding side effects is easy, but it is worth taking notice that you also get a chance to map an existing tool to something more domain specific. As we did here converting the general **get** method to a **getCurrentUser** method. If you think about it from an application standpoint it is kinda weird that it makes arbitrary requests to a string url. It is better to create an abstraction around it to keep things more maintainable and predictable.
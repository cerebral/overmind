# Server Side Rendering

Some projects requires you to render your application on the server. There are different reason to do this, like search engine optimizations, general optimizations and even browser support. What this means for state management is that you want to expose a version of your state on the server and render the components with that state. But that is not all, you also want to **hydrate** the changed state and pass it to the client with the HTML so that it can **rehydrate** and make sure that when the client renders initially, it renders the same UI.

## Preparing the project

When doing server side rendering the configuration of your application will be shared by the client and the server. That means you need to structure your app to make that possible. There is really not much you need to do.

```marksy
h(Example, { name: "guide/writingtests/structuringtheapp.ts" })
```

Here we only export the configuration from the main Overmind file. The instantiation rather happens where we prepare the application on the client side. That means we can now safely import the configuration also on the server.

## Preparing effects

The effects will also be shared with the server. Typically this is not an issue, but you should be careful about creating effects that runs logic when they are defined. You might also consider lazy loading effects so that you avoid loading them on the server at all. You can read more about in the [running side effects guide](/http://localhost:4000/guides/beginner/04_runningsideeffects).

## Rendering on the server

When you render your application on the server you will have to create an instance of Overmind designed for running on the server. On this instance you can change the state and provide it to your components for rendering. When the components have rendered you can **hydrate** the changes and pass them a long to the client so that you can **rehydrate**.

```marksy
h(Notice, null, "Overmind does not hydrate the state, but the mutations you performed. That means it minimizes the payload passed over the wire.")
```

The following shows a very simple example using an [express](https://expressjs.com/) middleware to return a server side rendered version of your app.

```marksy
h(Example, { name: "guide/serversiderendering/renderonserver.ts" })
```

## Rehydrate on the client

On the client you just want to make sure that your Overmind instance rehydrates the mutations performed on the server so that when the client renders, it does so with the same state. The **onInitialize** hook of Overmind is the perfect spot to do this.

```marksy
h(Example, { name: "guide/serversiderendering/renderonclient.ts" })
```

```marksy
h(Notice, null, "If you are using state first routing, make sure you prevent the router from firing off the initial route, as this is not needed")
```

# Overmind

The **Overmind** class is used to create the application instance. To connect your application to components your create a connect function using the related view package. 

```marksy
h(Example, { name: "api/app_initialize" })
```

You can pass a second argument to the **App** constructor. This is an options object with the following properties:

## addMutationListener

It is possible to listen to all mutations performed in Overmind. This allows you to create special effects based on mutations within a certain domain of your app, or whatever else you come up with.

```marksy
h(Example, { name: "api/app_addMutationListener" })
```


## options.devtools
If you develop your app on localhost the application connects to the devtools on **localhost:3031**. You can change this in case you need to use an IP address, the devtools is configured with a different port or you want to connect to localhost (with default port) even though the app is not on localhost.

```marksy
h(Example, { name: "api/app_options_devtools" })
```

## options.logProxies
By default, in **development**, Overmind will make sure that any usage of **console.log** will log out the actual object/array, instead of any proxy wrapping it. This is most likely what you want. If you want to turn off this behaviour, set this option to **true**.

```marksy
h(Example, { name: "api/app_options_logproxies" })
```
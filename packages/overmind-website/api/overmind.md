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
By default the application connects to the devtools on **localhost:3031**, but you can change this in case you need to use an IP address ot the devtools has configured with a different port.

```marksy
h(Example, { name: "api/app_options_devtools" })
```
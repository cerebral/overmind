# Overmind

The **Overmind** class is used to create the application instance. To connect your application with components you need to create and export your own connect function using the related view package. 

```marksy
h(Example, { name: "api/app_initialize" })
```

You can pass a second argument to the **Overmind** constructor. This is an options object with the following properties:

## devtools
By default the application connects to the devtools on **localhost:3031**, but you can change this in case you need to use an IP address or the devtools has configured with a different port.

```marksy
h(Example, { name: "api/app_options_devtools" })
```

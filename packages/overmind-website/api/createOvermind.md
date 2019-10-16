# createOvermind

The **createOvermind** factory is used to create the application instance. You need to create and export a mechanism to connect your instance to the components. Please look at the guides for each view layer for more information.

```marksy
h(Example, { name: "api/app_initialize" })
```

You can pass a second argument to the **createOvermind** factory. This is an options object with the following properties.

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

## options.name
If you have multiple instances of Overmind on the same page you can name your app to differentiate them.

```marksy
h(Example, { name: "api/app_options_name" })
```

## options.hotReloading
By default Overmind will do the necessary hot reloading mechanism to keep your state, actions and effects updated. You might not want to use this feature or Overmind does not correctly detect that hot reloading should be turned off. You can turn it off with an option.

```marksy
h(Example, { name: "api/app_options_hotreloading" })
```

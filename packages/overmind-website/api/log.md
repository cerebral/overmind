# Log

If you ever need to log out state it can be a good idea to use the log function from Overmind. First of all it will log out a plain value. Since Overmind heavily depends on JavaScript proxies a normal **console.log** will give you an object that you probably will not recognize at first sight. The other benefit of the Overmind logger is that it will show you the state of that value when it was logged. If you do a plain **console.log** on an object or array your developer console will show you the latest state of the value, meaning that it might have changed after you logged. This can be very confusing when debugging.

```marksy
h(Example, {name: "api/log"})
```
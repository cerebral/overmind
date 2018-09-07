# Compute

```marksy
h(Example, { name: "api/compute" })
```

You can add computed state values. These state values are functions that takes one argument, `filterNameBy` in the example above. This argument can be whatever you want, but it can only be a single argument. That means if you want to pass in multiple values you would pass those as part of an object. The reason computed state values work like this is because this argument is the cache key. As long as you pass in the same argument and the accessed state is not changed, the cached value is instantly returned.

By default a computed state value allows 10 values to be cached. This can be adjusted with the limit option. When a new value is cached, the last cached value is popped off.

Note that the argument you pass in to calculate the computed state value is stored by reference. That means if you pass in an object as the argument, the cache is only valid when you pass in the exact same object. That means you should only change reference on the object when the object indeed has a change.

You can learn more about computed state values in [the following guide](/guides/computing_like_a_pro).
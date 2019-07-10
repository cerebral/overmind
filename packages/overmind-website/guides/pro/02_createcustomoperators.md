# Create custom operators

The operators concept of Overmind is based on the [op-op spec](https://github.com/christianalfoni/op-op-spec), which allows for endless possibilities in functional composition. But since Overmind does not only pass values through these operators, but also the context where you can change state, run effects etc., we want to simplify how you can create your own operators. The added benefit of this is that the operators you create are also tracked in the devtools.

## toUpperCase

Let us create an operator that simply uppercases the string value passed through. This could easily have been done using the **map** operator, but for educational purposes let us see how we can create our very own operator.

```marksy
h(Example, { name: "guide/createcustomoperators/touppercase" })
```

We first create a function that returns an operator when we call it. We pass this operator a **name**, an optional **description** and the callback that is executed when the operator runs. This operator might receive an **error**, that you can handle if you want to. It also receives the **context**, the current **value** and a function called **next**.

In this example we did not use the **context** because we are not going to look at any state, run effects etc. We just wanted to change the value passed through. All operators need to handle the **error** in some way. In this case we just pass it along to the next operator by calling **next** with the error as the first argument and the current value as the second. When there is no error it means we can manage our value and we do so by calling **next** again, but passing **null** as the first argument, as there is no error. And the second argument is the new **value**.

## operations

You might want to run some logic related to your operator. Typically this is done by giving a callback. You can provide this callback whatever information you want, even handle its return value. So for example the **map** operator is implemented like this:

```marksy
h(Example, { name: "guide/createcustomoperators/map" })
```

## mutations

You can also create operators that have the ability to mutate the state, it is just a different factory **createMutationFactory**. This is how the **action** operator is implemented:

```marksy
h(Example, { name: "guide/createcustomoperators/action" })
```

## paths

You can even manage paths in your operator. This is how the **when** operator is implemented:

```marksy
h(Example, { name: "guide/createcustomoperators/when" })
```

## aborting

Some operators want to prevent further execution. That is also possible to implement, as seen here with the **filter** operator:

```marksy
h(Example, { name: "guide/createcustomoperators/filter" })
```

The **final** argument bypasses any other operators.

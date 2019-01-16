# Going functional

You get very far building your application with straight forward imperative actions. This is typically how we learn programming and is arguably close to how we think about the world. But this approach lacks a good structured way to compose smaller pieces together. Reusing existing logic in multiple contexts. As the complexity of your application increases you will find benefits doing some of your logic, or maybe all your logic, in a functional style.

Let us look at a concrete example of how messy an imperative approach would be compared to a functional approach.

```marksy
h(Example, { name: "guide/goingfunctional/messy" })
```

What we see here is an action trying to express doing a search. We only want to search when the length of the query is more than 2 and we only want to trigger the search when the user has not changed the query for 200 milliseconds.

If we were to do this in a functional style it would look more like this:

```marksy
h(Example, { name: "guide/goingfunctional/clean" })
```

Now we have created a couple of custom operators that we can reuse in other compositions. In addition we have made our code declarative. Instead of showing implementation details we rather "tell the story of the code". 

## Calling an operator

To get going with functional code you can simply convert any existing action by using the **action** operator.

```marksy
h(Example, { name: "guide/goingfunctional/actionoperator" })
```

This makes your action a composable piece to be used with other operators. Even though we converted our action into an operator it can still be called as normal from a component:

```marksy
h(Example, { name: "guide/goingfunctional/calloperator" })
```

But not only the **action** operator can be attached as a callable action on your Overmind instance, **any** operator can be used. That means you will have some operators that is only used for composition and some that are attached to the Overmind instance as an action to be called, typically from a component.

Here we see the **parallel** operator being used as a callable action to run two action operators in parallel:
```marksy
h(Example, { name: "guide/goingfunctional/callactionoperator" })
```

## Piping


To compose the different operators together you typically use **pipe**. You can also compose pipes into pipes, it is just an operator like the rest.

```marksy
h(Example, { name: "guide/goingfunctional/pipe" })
```

There are several operators available and you can quite easily create new operators from scratch. They er built with the [op-op spec](https://github.com/christianalfoni/op-op-spec). A specification designed specifically to move state management solutions into a functional world.

## Factories

A familiar concept in functional programming is the use of factories. A factory is a function that creates an operator. This can be used to send *options* to an operator. A typical example of this is the **lengthGreaterThan** operator we built previously.

```marksy
h(Example, { name: "guide/goingfunctional/factory" })
```
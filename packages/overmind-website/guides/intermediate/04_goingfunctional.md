# Going functional

You get very building your application with straight forward imperative actions. This is typically how we learn programming and is arguably close to how we think about the world. But this approach lacks a good structured way to compose multiple smaller pieces together. Reusing existing logic in multiple contexts. As the complexity of your application increases you will find benefits doing some of your logic, or maybe all your logic, in a functional style.

Let us look at a concrete example of how messy an imperative approach would be compared to a functional approach.

```marksy
h(Example, { name: "guide/goingfunctional/messy" })
```

What we see here is an action trying to express doing a search. We only want to search when the length of the query is more than 2 and we only want to trigger the search when the user has not pressed any keys for 200 milliseconds.

If we were to do this in a functional style it would look more like this:

```marksy
h(Example, { name: "guide/goingfunctional/clean" })
```

Now we have created a couple of custom operators that we can reuse in other compositions. In addition we have made our code declarative. Instead of showing implementation details we rather "tell the story of the code". 

The great thing about the operator API is that you can use it to any extent you want, even drop it if the complexity of your app does not reach a level where it makes sense.

## Converting actions to functional actions

To get going with functional code you can simply convert any existing action by using the **action** operator.

```marksy
h(Example, { name: "guide/goingfunctional/actionoperator" })
```

This makes your action a composable piece to be used with other operators. But actually **all** operators can be called as an action, not only the action operator. When you attach an operator to your actions configuration, you can call them from components.

## Piping

To compose the different operators together you typically use **pipe**. You can also compose pipes into pipes, it is just an operator like the rest.

```marksy
h(Example, { name: "guide/goingfunctional/pipe" })
```

There are several operators available and you can quite easily create new operators from scratch. They er built with the [op-op spec](https://github.com/christianalfoni/op-op-spec). A specification designed specifically to  lower the threshold of moving into the functional world.

## Typescript

All operators have the same type.

`TOperator<Config, Input, Output>`

That means all operators has an input and an output. For most of the operators the output is the same as input, though with others, like **map**, it produces a new output. When you use the consumable type, either directly from Overmind or with explicit typing, there are some defaults.

Just like the **Action** type, the **Operator** type does not need any arguments. That means it expects no value to be passed in.

`Operator`

If you do define an *input*, that also becomes the *output*. 

`Operator<string>`

Or you can of course define both.

`Operator<string, number>`

Now what is important to understand is that the Operator type will yell at you if you use it incorrectly with an actual operator. For example if you define a different output than input for an action operator. That is because an action operator is typed to pass its input as output.

```marksy
h(Example, { name: "guide/goingfunctional/wrongoperator" })
```

You will also get yelled at by Typescript if you compose together operators that does not match outputs with inputs. But yeah, that is why we use it :-)
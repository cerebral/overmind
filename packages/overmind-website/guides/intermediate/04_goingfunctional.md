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

## Structuring and calling operators

You will typically rely on an **operators** file where all your composable pieces live. Inside your **actions** file you expose the operators that you actually want to call from components along side your other plain actions.

To get going with functional code you can simply convert any existing action by using the **action** operator.

```marksy
h(Example, { name: "guide/goingfunctional/actionoperator" })
```

Your first impression is probably "more syntax". But we are doing something important here. We have created a composable piece of logic. The **action** operator is one of many operators. The **action** operator just allows us to express logic as a traditional action, though other operators has other behaviours. The **fromOperator** function converts any operator into a callable action.

Let us look at an example where we actually create two composable pieces and use them:

```marksy
h(Example, { name: "guide/goingfunctional/callactionoperator" })
```

Here we see the **parallel** operator being used as a callable action to run two action operators in parallel. Maybe this is the only place you use the **getPosts** and **getUsers** operator, and in that case there is not much difference than if you just created a plain action. But when you start using the same pieces of logic across different actions, then it is time to move functional!

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
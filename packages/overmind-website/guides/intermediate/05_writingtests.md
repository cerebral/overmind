# Writing tests

Testing is a broad subject and everybody has an opinion about it. We can only show you how we think about testing in general and how to effectively write those tests for your Overmind app. The benefit of Overmind is that you only test pure functions. That means there is no trickery to testing actions or operators. Your effects can also easily be made testable. These kinds of tests is what you would call **unit tests**. Since these unit tests covers the intention of each piece of logic we do not consider any need for writing integration tests on the logic. If you want to test how your application works when it is all put together we recommend doing integration tests as close to the user experience as possible. Testing solutions like [Cypress.io](https://www.cypress.io/) is a great way to do integration tests as close to the user experience as possible.

## Testing actions

Since all effects are "injected" into actions you can easily stub them out. That means if you for example have an action that looks like this:

```marksy
h(Example, { name: "guide/writingtests/action.ts" })
```

You might want to test if a thrown error is handled correctly here. This is an example of how you could do that:

```marksy
h(Example, { name: "guide/writingtests/actiontest.ts" })
```

If your actions can result in multiple scenarios a unit test is beneficial. But you will be surprised how straight forward the logic of your actions will become. Since effects are encouraged to be application specific you will most likely be testing those more than you will test any action.

## Testing operators

Operators are based on the [op-op specification](https://github.com/christianalfoni/op-op-spec), which means that they actually have a different signature when being called. This is not something you think about writing your application code, but when testing single operators it is important to get it right.

So imagine you have an operator like:

```marksy
h(Example, { name: "guide/writingtests/operator.ts" })
```

You might want to test that it does what you want it to:

```marksy
h(Example, { name: "guide/writingtests/operatortest.ts" })
```

You can even do tests of pipes that are composed of multiple operators. You just pass in a stubbed context and check it on the *complete* callback (the second one).

## Testing effects

Where you want to put in your effort is with the effects. This is where you have your chance to build a domain specific API for your actual application logic. The bridge between some generic tool and what your application actually wants to use it for. A simple example of this is doing requests. Maybe you want to use axios to reach your API, but you do not really care about testing that library. What you want to test is that it is used correctly when you use your application specific API. Lets look at an example:

```marksy
h(Example, { name: "guide/writingtests/effect.ts" })
```

Lets see how you could write a test for it:

```marksy
h(Example, { name: "guide/writingtests/effecttest.ts" })
```

Again, effects is where you typically have your most brittle logic. With the approach just explained you will have a good separation between your application logic and the brittle and "impure". In an Overmind app, especially written in Typescript, you get very far just testing your effects and then do integration tests for your application. But as mentioned in the introduction we all have very different opinions on this, at least the API allows testing to whatever degree you see fit.
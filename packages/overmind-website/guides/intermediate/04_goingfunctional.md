# Going functional

You get very far building your application with straightforward imperative actions. This is typically how we learn programming and is arguably close to how we think about the world. But this approach can cause you to overload your actions with imperative code, making them more difficult to read and especially reuse pieces of logic. As the complexity of your application increases you will find benefits to doing some of your logic, or maybe all your logic, in a functional style.

Let us look at a concrete example of how messy an imperative approach would be compared to a functional approach.

```marksy
h(Example, { name: "guide/goingfunctional/messy" })
```

What we see here is an action trying to express a search. We only want to search when the length of the query is more than 2 characters and we only want to trigger the search when the user has not changed the query for 200 milliseconds.

If we were to do this in a functional style it would look more like this:

```marksy
h(Example, { name: "guide/goingfunctional/clean" })
```
As you can see our action is described more declaratively. We could have moved each individual piece of logic, each operator, into a different file. All these operators could now be reused in other action compositions.

## Structuring operators

You will typically rely on an **operators** file where all your composable pieces live. Inside your **actions** file you expose the operators and compose them together using **pipe** and other *composing* operators. This approach ensures:

1. Each operator is defined separately and in isolation
2. The action composed of operators is defined with the other actions
3. The action composed of operators is declarative (no inline operators with logic)

Let us look at how the operators in the search example could have been implemented:

```marksy
h(Example, { name: "guide/goingfunctional/callactionoperator" })
```

```marksy
h(Notice, null, "Note that we give all the actual operator functions the same name as the exported variable that creates it. The reason is that this name is picked up by the devtools and gives you more insight into how your code runs.")
```

You might wonder why we define the operators as functions that we call. We do that for the following reasons:

1. It ensures that each composition using the operator has a unique instance of that operator. For most operators this does not matter, but for others like **debounce** it actually matters.
2. Some operators require options, like the **lengthGreaterThan** operator we created above. Defining all operators as functions just makes things more consistent.
3. If you were to create an operator that is composed of other operators you can safely do so without thinking about the order of definition in the *operators* file. The reason being that the operator is lazily created

```marksy
h(TypescriptNotice, null, "There is a **4.** reason to use functions with Typescript. It opens up to partially and generically typed operators. Read more about this in the Typescript guide.")
```

Now, you might feel that we are just adding complexity here. An additional file with more syntax. But clean and maintainable code is not about less syntax. It is about structure, predictability and reusability. What we achieve with this functional approach is a super readable abstraction in our *actions* file. There is no logic there, just references to logic. In our *operators* file each piece of logic is defined in isolation with very little logic.

## Calling operators

You typically compose the different operators together with **pipe** and **parallel** in the *actions* file, but any operator can actually be exposed as an action. With the search example:

```marksy
h(Example, { name: "guide/goingfunctional/clean" })
```

You would call this action like any other:

```marksy
h(Example, { name: "guide/goingfunctional/calloperator" })
```

## Inputs and Outputs

To produce new values throughout your pipe you can use the **map** operator. It will put whatever value you return from it on the pipe for the next operator to consume.

```marksy
h(Example, { name: "guide/goingfunctional/map" })
```

```marksy
h(TypescriptNotice, null, "Notice here that we are typing both the input and the output. Both for the **map** operator and the **pipe** operator. This is important to manage the composition of operators. Typically operators pass on the same value they receive, meaning that you do not need the second typing parameter for the **Operator** type.")
```

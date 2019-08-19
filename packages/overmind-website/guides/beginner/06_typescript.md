# Typescript

Overmind is written in Typescript and it is written with a focus on you dedicating as little time as possible to help Typescript understand what your app is all about. Typescript will spend a lot more time helping you. If you are not a Typescript developer Overmind is a really great project to start learning it as you will get the most out of the little typing you have to do.

## Two typing approaches

### 1. Declare module

The most straightforward way to type your application is to use the **declare module** approach. This will work for most applications, but might make you feel uncomfortable as a hardcore Typescripter. The reason is that we are overriding an internal type, meaning that you can only have one instance of Overmind running inside your application.

```marksy
h(Example, { name: "guide/typescript/declare" })
```

Now you can import any type directly from Overmind and it will understand the configuration of your application. Even the operators are typed.

```marksy
h(Example, { name: "guide/typescript/declare_imports" })
```

### 2. Explicit typing
You can also explicitly type your application. This gives more flexibility.

```marksy
h(Example, { name: "guide/typescript/explicit" })
```

You only have to set up these types once, where you bring your configuration together. That means if you use multiple namespaced configuration you still only create one set of types, as shown above.

Now you only have to make sure that you import your types from this file, instead of directly from the Overmind package.

```marksy
h(Example, { name: "guide/typescript/explicit_import" })
```

```marksy
h(Notice, null, "The Overmind documentation is written for implicit typing. That means whenever you see a type import directly from the Overmind package, you should rather import from your own defined types.")
```

## Linting

When you are using TSLint it is important that you use the official [Microsoft Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) for VS Code. 

## Actions

The action type takes either an input type, an output type, or both.

```marksy
h(Example, { name: "guide/typescript/action" })
```

You also have an **async** version of this type. You use this when you want to define an **async** function, which implicitly returns a promise, or a function that explicitly returns a promise.

```marksy
h(Example, { name: "guide/typescript/async_action" })
```


## Operators

Operators is like the **Action** type: it can take an optional input, but it always produces an output. By default the output of an operator is the same as the input.

```marksy
h(Example, { name: "guide/typescript/operatorinputsandoutputs" })
```

The **Operator** type is used to type all operators. The type arguments you give to **Operator** have to match the specific operator you use though. So for example if you type a **mutate** operator with a different output than the input:

```marksy
h(Example, { name: "guide/typescript/wrongoperator" })
```

Typescript yells at you, because this operator just passes the value straight through. 

Typically you do not think about this and Typescript rather yells at you when the value you are passing through your operators is not matching up.

### Generic input

You might create an operator that does not care about its input. For example:

```marksy
h(Example, { name: "guide/typescript/operatorinfer" })
```

Composing **doSomething** into the **pipe** gives an error, cause the action is typed with a **string** input, but the **doSomething** operator is typed with **void**.

To fix this we just add a generic type to the definition of our operator:

```marksy
h(Example, { name: "guide/typescript/operatorinfer_solution" })
```

Now Typescript infers the input type of the operator and passes it along.

### Partial input

For example:

```marksy
h(Example, { name: "guide/typescript/operatorpartial" })
```

Now the *input* is actually okay, because `{ isAwesome: boolean }` matches the **User** type, but we are also now saying that the type of *output* will be `{ isAwesome: boolean }`, which does not match the **User** type required by **handleAwesomeUser**.

To fix this we again infer the type, but using **extends** to indicate that we do have a requirement to the type it should pass through:

```marksy
h(Example, { name: "guide/typescript/operatorpartial_solution" })
```

That means this operator can handle any type that matches an **isAwesome** property, though will pass the original type through.

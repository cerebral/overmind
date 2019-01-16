# Typescript

Overmind is written in Typescript and it is written with a focus on your keeping as little time as possible helping Typescript understand what your app is all about. Typescript will spend a lot more time helping you. There are actually two approaches to typing in Overmind.

## Declare module

The most straight forward way to type your application is to use the **declare module** approach. This will work for most applications, but might make you feel uncomfortable as a harcore Typescripter. The reason is that we are overriding an internal type, meaning that you can only have one instance of Overmind running inside your application.

```marksy
h(Example, { name: "guide/typescript/declare.ts" })
```

Now you can import any type directly from Overmind and it will understand the configuration of your application. Even the operators are typed.

```marksy
h(Example, { name: "guide/typescript/declare_imports.ts" })
```

## Explicit typing
You can also explicitly type your application. This gives more flexibility.

```marksy
h(Example, { name: "guide/typescript/explicit.ts" })
```

## Actions

The action type takes either no arguments or a single argument. If you give no arguments to the action it will be typed as not expecting an argument at all. When you do type with an argument that is the type of the **value** on the context. This value is populated when you call the action on the Overmind instance.

```marksy
h(Example, { name: "guide/typescript/action.ts" })
```


## Operators

Operators is like the **Action** type, it can take an optional input, but it can also have an output. By default the output of an operator is the same as the input. Most operators has its output the same as the input, meaning the incoming values just passes through.

```marksy
h(Example, { name: "guide/typescript/operatorinputsandoutputs" })
```

Now what is important to understand is that the **Operator** is used with all operators in Overmind, cause all of them is about "passing a value to the next operator". The arguments you give has to match the specific operator though. So for example if you type an **action** operator with a different output than the input:

```marksy
h(Example, { name: "guide/typescript/wrongoperator" })
```

Typescript yells at you, because this operator just passes the value straight through. 

Typically you do not think about this and Typescript rather yells at you when the value you are passing through your operators is not matching up.

### Caveats
There are two **limitations** to the operators type system which we are still trying to figure out:

#### 1. Partial input type

For example:

```marksy
h(Example, { name: "guide/typescript/operatorpartial" })
```

There is no way to express in Typescript that you should uphold this partial typing of **filterAwesomeUser** and still pass the inferred input, **User**, as the output. This will give a typing error.

This can be handled by making the operator a factory instead:

```marksy
h(Example, { name: "guide/typescript/operatorpartial_solution" })
```

#### 2. Infer input

You might create an operator that does not care about its input. For example:

```marksy
h(Example, { name: "guide/typescript/operatorinfer" })
```

Composing **doSomeStateChange** into the **pipe** gives an error, cause this operator expects a **void** type. There is no other way to make this work than inlining the **doSomeStateChange** operator into the pipe in question, which infers the correct input.

You could use the same trick here though:

```marksy
h(Example, { name: "guide/typescript/operatorinfer_solution" })
```


#### Summary
Typescript is not functional, it is object oriented and it is very difficult to make it work with this kind of APIs. We have high hopes though cause Typescript is evolving rapidly and Microsoft is dedicated to make this an awesome type system for JavaScript. If you got mad Typescript skills, please contact us to iterate on the type system and make this stuff work :-)